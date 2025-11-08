/**
 * Call Creation API Route
 * Creates a new emergency call with AI triage and emotion analysis
 */

import { NextRequest, NextResponse } from 'next/server';
import { EmergencyCall } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phoneNumber, transcript, emotions, conversationId } = body;

    if (!phoneNumber) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      );
    }

    // Generate unique call ID
    const callId = conversationId || `call_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Step 1: Run AI triage on transcript (if provided)
    let triageData = null;
    if (transcript && transcript.length > 0) {
      try {
        const fullTranscript = Array.isArray(transcript) 
          ? transcript.map(t => t.text).join(' ')
          : transcript;

        const triageResponse = await fetch(`${request.nextUrl.origin}/api/triage/extract`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ transcript: fullTranscript }),
        });
        
        if (triageResponse.ok) {
          triageData = await triageResponse.json();
          console.log('✅ AI triage completed:', {
            incident: triageData.extraction?.incident_type,
            severity: triageData.extraction?.severity_score
          });
        }
      } catch (error) {
        console.warn('AI triage failed:', error);
      }
    }

    // Step 2: Process emotion data from Hume
    const topEmotion = emotions && emotions.length > 0 
      ? emotions.reduce((prev: any, current: any) => 
          (current.intensity > prev.intensity) ? current : prev
        )
      : null;

    const avgEmotionIntensity = emotions && emotions.length > 0
      ? emotions.reduce((sum: number, e: any) => sum + e.intensity, 0) / emotions.length
      : 0.5;

    // Step 3: Calculate severity based on emotions + AI triage
    let severityScore = triageData?.extraction?.severity_score || 50;
    
    // Boost severity based on distress emotions
    if (topEmotion) {
      const emotionBoost = {
        'fear': 20,
        'distress': 20,
        'panic': 25,
        'anxiety': 15,
        'anger': 15,
        'sadness': 10,
      };
      severityScore += (emotionBoost[topEmotion.emotion as keyof typeof emotionBoost] || 0) * topEmotion.intensity;
    }

    severityScore = Math.min(Math.max(severityScore, 0), 100);

    const severity = severityScore >= 80 ? 'critical' :
                    severityScore >= 60 ? 'high' :
                    severityScore >= 40 ? 'medium' : 'low';

    // Step 4: Create the emergency call object
      const newCall: EmergencyCall = {
        id: callId,
        caller_number: phoneNumber,
        status: 'active',
        call_status: 'in-progress',
      
      // Location: Use IP-based geolocation or browser location in production
      caller_location: {
        address: triageData?.extraction?.location || 'Location pending verification',
        latitude: 37.7749 + (Math.random() - 0.5) * 0.1,
        longitude: -122.4194 + (Math.random() - 0.5) * 0.1,
        confidence: 0.60,
      },
      
      // Incident data from AI triage
      incident_type: triageData?.extraction?.incident_type || 'emergency',
      incident_subtype: triageData?.extraction?.incident_subtype || 'Unknown',
      severity,
      severity_score: severityScore,
      
      // Emotion data from Hume
      top_emotion: topEmotion?.emotion || 'distress',
      emotion_intensity: topEmotion?.intensity || avgEmotionIntensity,
      caller_condition: severityScore >= 70 ? 'panicked' :
                       severityScore >= 50 ? 'distressed' :
                       severityScore >= 30 ? 'unclear' : 'calm',
      emotion_data: emotions || [],
      
      // AI triage results
      ai_summary: triageData?.extraction?.summary || 'Emergency call received. Awaiting detailed analysis.',
      ai_confidence: triageData?.extraction?.confidence_score || 0.70,
      persons_involved: triageData?.extraction?.persons_involved || 1,
      immediate_threats: triageData?.extraction?.immediate_threats || [],
      
      // Transcript
      transcript: transcript || [],
      
      // Timestamps
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      
      // AI recommendation
      ai_recommendation: triageData?.extraction?.recommendations?.join('. ') || 
                        'Dispatch appropriate emergency services immediately.',
    };

    console.log('✅ Emergency call created:', {
      id: callId,
      severity,
      severityScore,
      emotion: topEmotion?.emotion,
      incident: newCall.incident_type
    });

    // In production, this would save to Supabase
    // For now, we return the call data and handle it client-side
    
    return NextResponse.json({
      success: true,
      call: newCall,
      message: 'Emergency call created successfully',
    });

  } catch (error) {
    console.error('Call creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create call' },
      { status: 500 }
    );
  }
}


