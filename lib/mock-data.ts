/**
 * KWIK Mock Data
 * Sample emergency calls for demo and development
 */

import { EmergencyCall, TranscriptSegment } from './types';

/**
 * Mock emergency calls with realistic scenarios
 * Used for demo without live API integrations
 */
export const mockCalls: EmergencyCall[] = [
  {
    id: '1',
    caller_number: '+14155552137',
    status: 'active',
    call_status: 'in-progress',
    incident_type: 'fire',
    incident_subtype: 'house fire',
    severity: 'critical',
    severity_score: 95,
    caller_location: {
      address: '9324 Lincoln Ave',
      city: 'Delaware City',
      state: 'CA',
      latitude: 37.7749,
      longitude: -122.4194,
      confidence: 0.92
    },
    top_emotion: 'distress',
    emotion_intensity: 0.87,
    caller_condition: 'panicked',
    ai_summary: 'Critical house fire with 2 people trapped inside. Caller reports heavy smoke and flames visible from street. Immediate evacuation needed.',
    ai_confidence: 0.94,
    persons_involved: 2,
    immediate_threats: ['active flames', 'trapped occupants', 'heavy smoke'],
    priority_code: 'Code 3',
    created_at: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 60 * 1000).toISOString(),
    ai_recommendation: {
      action_type: 'dispatch_multiple',
      primary_unit: 'Fire Engine 7',
      support_units: ['Ladder Truck 3', 'Medic 12', 'Battalion Chief 2'],
      priority_code: 'Code 3',
      special_instructions: 'Active structure fire with trapped occupants. Request immediate response. Stage EMS for potential victims.',
      rationale: 'Critical life safety situation requiring immediate fire suppression and rescue operations.',
      alternative_actions: ['Request mutual aid if Engine 7 unavailable'],
      confidence: 0.96,
      approval_required: false,
      estimated_response_time: '3-4 minutes'
    }
  },
  {
    id: '2',
    caller_number: '+14155559821',
    status: 'active',
    call_status: 'in-progress',
    incident_type: 'fire',
    incident_subtype: 'house fire',
    severity: 'critical',
    severity_score: 93,
    caller_location: {
      address: '456 Blair Hills Rd',
      city: 'San Francisco',
      state: 'CA',
      latitude: 37.7850,
      longitude: -122.4283,
      confidence: 0.88
    },
    top_emotion: 'fear',
    emotion_intensity: 0.82,
    caller_condition: 'distressed',
    ai_summary: 'Residential fire in Blair Hills area. Caller evacuated safely but fire spreading to neighboring structure.',
    ai_confidence: 0.89,
    persons_involved: 1,
    immediate_threats: ['spreading fire', 'property damage risk'],
    priority_code: 'Code 3',
    created_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    caller_number: '+14155558234',
    status: 'active',
    call_status: 'in-progress',
    incident_type: 'fire',
    incident_subtype: 'house fire',
    severity: 'critical',
    severity_score: 90,
    caller_location: {
      address: '789 Blair Hills Ct',
      city: 'San Francisco',
      state: 'CA',
      latitude: 37.7835,
      longitude: -122.4270,
      confidence: 0.91
    },
    top_emotion: 'anxiety',
    emotion_intensity: 0.75,
    caller_condition: 'distressed',
    ai_summary: 'Kitchen fire in Blair Hills residence. Caller attempting to use fire extinguisher.',
    ai_confidence: 0.87,
    persons_involved: 1,
    immediate_threats: ['active fire', 'smoke inhalation risk'],
    priority_code: 'Code 3',
    created_at: new Date(Date.now() - 7 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 3 * 60 * 1000).toISOString()
  },
  {
    id: '4',
    caller_number: '+14155553421',
    status: 'active',
    call_status: 'in-progress',
    incident_type: 'accident',
    incident_subtype: 'car accident',
    severity: 'high',
    severity_score: 75,
    caller_location: {
      address: 'Highway 101 & Yorktown Dr',
      city: 'San Francisco',
      state: 'CA',
      latitude: 37.7920,
      longitude: -122.4350,
      confidence: 0.85
    },
    top_emotion: 'concern',
    emotion_intensity: 0.68,
    caller_condition: 'calm',
    ai_summary: 'Multi-vehicle accident on Highway 101. 2 vehicles involved, moderate damage. One person reporting neck pain.',
    ai_confidence: 0.82,
    persons_involved: 3,
    immediate_threats: ['traffic hazard', 'potential injury'],
    priority_code: 'Code 2',
    created_at: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 4 * 60 * 1000).toISOString()
  },
  {
    id: '5',
    caller_number: '+14155557654',
    status: 'active',
    call_status: 'in-progress',
    incident_type: 'crime',
    incident_subtype: 'theft',
    severity: 'medium',
    severity_score: 55,
    caller_location: {
      address: '321 Yorktown Dr',
      city: 'San Francisco',
      state: 'CA',
      latitude: 37.7890,
      longitude: -122.4320,
      confidence: 0.79
    },
    top_emotion: 'frustration',
    emotion_intensity: 0.58,
    caller_condition: 'calm',
    ai_summary: 'Car theft in progress witnessed by caller. Suspect fled on foot heading eastbound.',
    ai_confidence: 0.76,
    persons_involved: 1,
    immediate_threats: ['suspect at large'],
    priority_code: 'Code 2',
    created_at: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 6 * 60 * 1000).toISOString()
  },
  {
    id: '6',
    caller_number: '+14155556789',
    status: 'active',
    call_status: 'in-progress',
    incident_type: 'crime',
    incident_subtype: 'theft',
    severity: 'medium',
    severity_score: 52,
    caller_location: {
      address: '654 Yorktown Dr',
      city: 'San Francisco',
      state: 'CA',
      latitude: 37.7905,
      longitude: -122.4335,
      confidence: 0.81
    },
    top_emotion: 'anger',
    emotion_intensity: 0.62,
    caller_condition: 'calm',
    ai_summary: 'Package theft from front porch. Suspect vehicle description provided.',
    ai_confidence: 0.73,
    persons_involved: 1,
    immediate_threats: [],
    priority_code: 'Code 1',
    created_at: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 8 * 60 * 1000).toISOString()
  },
  {
    id: '7',
    caller_number: '+14155554321',
    status: 'active',
    call_status: 'in-progress',
    incident_type: 'public_safety',
    incident_subtype: 'noise complaint',
    severity: 'low',
    severity_score: 25,
    caller_location: {
      address: '111 Market St',
      city: 'San Francisco',
      state: 'CA',
      latitude: 37.7950,
      longitude: -122.4400,
      confidence: 0.88
    },
    top_emotion: 'calm',
    emotion_intensity: 0.35,
    caller_condition: 'calm',
    ai_summary: 'Loud party noise complaint. Ongoing for past hour.',
    ai_confidence: 0.85,
    persons_involved: 1,
    immediate_threats: [],
    priority_code: 'Code 1',
    created_at: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 10 * 60 * 1000).toISOString()
  },
  {
    id: '8',
    caller_number: '+14155559876',
    status: 'active',
    call_status: 'in-progress',
    incident_type: 'public_safety',
    incident_subtype: 'noise complaint',
    severity: 'low',
    severity_score: 22,
    caller_location: {
      address: '222 Valencia St',
      city: 'San Francisco',
      state: 'CA',
      latitude: 37.7680,
      longitude: -122.4210,
      confidence: 0.90
    },
    top_emotion: 'calm',
    emotion_intensity: 0.28,
    caller_condition: 'calm',
    ai_summary: 'Construction noise before permitted hours.',
    ai_confidence: 0.83,
    persons_involved: 1,
    immediate_threats: [],
    priority_code: 'Code 1',
    created_at: new Date(Date.now() - 28 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 12 * 60 * 1000).toISOString()
  },
  {
    id: '9',
    caller_number: '+14155552468',
    status: 'active',
    call_status: 'in-progress',
    incident_type: 'public_safety',
    incident_subtype: 'noise complaint',
    severity: 'low',
    severity_score: 20,
    caller_location: {
      address: '333 Mission St',
      city: 'San Francisco',
      state: 'CA',
      latitude: 37.7900,
      longitude: -122.4000,
      confidence: 0.86
    },
    top_emotion: 'calm',
    emotion_intensity: 0.30,
    caller_condition: 'calm',
    ai_summary: 'Barking dog disturbing neighborhood.',
    ai_confidence: 0.80,
    persons_involved: 1,
    immediate_threats: [],
    priority_code: 'Code 1',
    created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 14 * 60 * 1000).toISOString()
  },
  {
    id: '10',
    caller_number: '+14155558642',
    status: 'active',
    call_status: 'in-progress',
    incident_type: 'public_safety',
    incident_subtype: 'noise complaint',
    severity: 'low',
    severity_score: 18,
    caller_location: {
      address: '444 Folsom St',
      city: 'San Francisco',
      state: 'CA',
      latitude: 37.7820,
      longitude: -122.3980,
      confidence: 0.84
    },
    top_emotion: 'calm',
    emotion_intensity: 0.32,
    caller_condition: 'calm',
    ai_summary: 'Loud music from neighboring apartment.',
    ai_confidence: 0.81,
    persons_involved: 1,
    immediate_threats: [],
    priority_code: 'Code 1',
    created_at: new Date(Date.now() - 32 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 16 * 60 * 1000).toISOString()
  },
  {
    id: '11',
    caller_number: '+14155553698',
    status: 'active',
    call_status: 'in-progress',
    incident_type: 'public_safety',
    incident_subtype: 'sports injury',
    severity: 'medium',
    severity_score: 45,
    caller_location: {
      address: '555 Golden Gate Park',
      city: 'San Francisco',
      state: 'CA',
      latitude: 37.7694,
      longitude: -122.4862,
      confidence: 0.77
    },
    top_emotion: 'concern',
    emotion_intensity: 0.55,
    caller_condition: 'calm',
    ai_summary: 'Possible ankle fracture from soccer game in Golden Gate Park.',
    ai_confidence: 0.71,
    persons_involved: 1,
    immediate_threats: [],
    priority_code: 'Code 2',
    created_at: new Date(Date.now() - 9 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 60 * 1000).toISOString()
  }
];

/**
 * Mock transcript for demo call
 */
export const mockTranscript: TranscriptSegment[] = [
  {
    id: 't1',
    call_id: '1',
    speaker: 'assistant',
    text: 'This is emergency services. What is your emergency?',
    timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    segment_order: 1
  },
  {
    id: 't2',
    call_id: '1',
    speaker: 'user',
    text: 'Oh my god! There\'s a fire! My house is on fire!',
    emotions: {
      distress: 0.92,
      fear: 0.88,
      panic: 0.85,
      anxiety: 0.78
    },
    top_emotion: 'distress',
    emotion_intensity: 0.92,
    timestamp: new Date(Date.now() - 119 * 1000).toISOString(),
    segment_order: 2
  },
  {
    id: 't3',
    call_id: '1',
    speaker: 'assistant',
    text: 'I understand this is very scary. I\'m here to help you. What is your exact location?',
    timestamp: new Date(Date.now() - 115 * 1000).toISOString(),
    segment_order: 3
  },
  {
    id: 't4',
    call_id: '1',
    speaker: 'user',
    text: '9324 Lincoln Avenue! In Delaware City! Please hurry!',
    emotions: {
      distress: 0.89,
      fear: 0.82,
      urgency: 0.90,
      panic: 0.80
    },
    top_emotion: 'urgency',
    emotion_intensity: 0.90,
    timestamp: new Date(Date.now() - 110 * 1000).toISOString(),
    segment_order: 4
  },
  {
    id: 't5',
    call_id: '1',
    speaker: 'assistant',
    text: 'Thank you. Are you safe right now? Are you outside the building?',
    timestamp: new Date(Date.now() - 105 * 1000).toISOString(),
    segment_order: 5
  },
  {
    id: 't6',
    call_id: '1',
    speaker: 'user',
    text: 'Yes, I\'m outside, but my neighbors are still inside! I can see smoke coming from their windows!',
    emotions: {
      distress: 0.87,
      fear: 0.85,
      concern: 0.83,
      anxiety: 0.75
    },
    top_emotion: 'distress',
    emotion_intensity: 0.87,
    timestamp: new Date(Date.now() - 100 * 1000).toISOString(),
    segment_order: 6
  },
  {
    id: 't7',
    call_id: '1',
    speaker: 'assistant',
    text: 'I have your information. Fire and medical units are being dispatched to 9324 Lincoln Avenue right now. They should arrive in 3 to 4 minutes. Do not enter the building. Stay on the line with me.',
    timestamp: new Date(Date.now() - 95 * 1000).toISOString(),
    segment_order: 7
  }
];

/**
 * Get formatted time elapsed string
 */
export function getTimeElapsed(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const minutes = Math.floor(diff / 60000);
  
  if (minutes < 1) return 'Just now';
  if (minutes === 1) return '1 min ago';
  if (minutes < 60) return `${minutes} min ago`;
  
  const hours = Math.floor(minutes / 60);
  if (hours === 1) return '1 hr ago';
  return `${hours} hrs ago`;
}

/**
 * Get severity color class
 */
export function getSeverityColor(severity?: string): string {
  switch (severity) {
    case 'critical':
      return 'bg-red-500 text-white';
    case 'high':
      return 'bg-orange-500 text-white';
    case 'medium':
      return 'bg-yellow-500 text-black';
    case 'low':
      return 'bg-green-500 text-white';
    default:
      return 'bg-gray-500 text-white';
  }
}

/**
 * Get emotion emoji
 */
export function getEmotionEmoji(emotion?: string): string {
  switch (emotion?.toLowerCase()) {
    case 'distress':
    case 'panic':
      return '😰';
    case 'fear':
      return '😨';
    case 'anxiety':
    case 'concern':
      return '😟';
    case 'anger':
    case 'frustration':
      return '😠';
    case 'calm':
      return '😌';
    default:
      return '😐';
  }
}

