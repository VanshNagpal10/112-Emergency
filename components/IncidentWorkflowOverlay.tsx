/**
 * Incident Workflow Overlay
 * Full-screen review & approval workflow for dispatch recommendations
 */

'use client';

import { useMemo, useState } from 'react';
import { EmergencyCall } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  CheckCircle2,
  MapPin,
  Clock,
  AlertTriangle,
  ShieldCheck,
  Radio,
  Activity,
  PanelLeftClose,
  Lightbulb,
  Shield,
  ClipboardCheck,
  Settings,
} from 'lucide-react';
import dynamic from 'next/dynamic';

const EmergencyMap = dynamic(() => import('@/components/EmergencyMap').then((mod) => mod.default), {
  ssr: false,
}) as any;

interface IncidentWorkflowOverlayProps {
  open: boolean;
  onClose: () => void;
  call: EmergencyCall | null;
  calls: EmergencyCall[];
}

type TimelineStatus = 'loading' | 'executing' | 'pending' | 'completed';

interface TimelineItem {
  id: string;
  status: TimelineStatus;
  label: string;
  unit: string;
  updatedAt: string;
  eta?: string;
}

export default function IncidentWorkflowOverlay({
  open,
  onClose,
  call,
  calls,
}: IncidentWorkflowOverlayProps) {
  const [timeline, setTimeline] = useState<TimelineItem[]>([
    {
      id: 'loading',
      status: 'loading',
      label: 'Loading status…',
      unit: 'PD 123',
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'executing',
      status: 'executing',
      label: 'Units deployed',
      unit: 'PD 123',
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'pending',
      status: 'pending',
      label: 'Units deployed',
      unit: 'PD 123',
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'completed',
      status: 'completed',
      label: 'Units deployed',
      unit: 'PD 123',
      updatedAt: new Date().toISOString(),
    },
  ]);
  const [selectedPolice, setSelectedPolice] = useState(true);
  const [selectedAmbulance, setSelectedAmbulance] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const selectedUnits = useMemo(() => {
    const units = [];
    if (selectedPolice) {
      units.push({
        id: 'unit-2341',
        label: 'Unit 2341',
        type: 'Firefighter',
        distance: '30 KM',
        eta: '3:04:34 PM UT',
      });
    }
    if (selectedAmbulance) {
      units.push({
        id: 'unit-2131',
        label: 'Unit 3421',
        type: 'Paramedics',
        distance: '30 KM',
        eta: '3:04:34 PM UT',
      });
    }
    return units;
  }, [selectedPolice, selectedAmbulance]);

  const handleApprove = () => {
    if (selectedUnits.length === 0) return;
    setConfirmOpen(true);
  };

  const handleConfirmDispatch = () => {
    setConfirmOpen(false);
    setArrivalMessage('3 minutes until arrival • Detected 3 mi away in Spring Ave.');
    setToastMessage('Actions approved — Units dispatched to ' + (call?.caller_location?.address || 'incident location'));
    setTimeline((prev) =>
      prev.map((item) =>
        item.id === 'pending'
          ? { ...item, status: 'executing', updatedAt: new Date().toISOString() }
          : item.id === 'completed'
          ? { ...item, status: 'completed', updatedAt: new Date().toISOString(), label: 'Arrival confirmed' }
          : item,
      ),
    );
  };

  if (!open || !call) return null;

  return (
    <div className="fixed inset-0 z-[2000] bg-gray-950/98 text-gray-100 flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-3 text-sm">
          <span className="text-gray-400">Incident Management</span>
          <span className="text-blue-400">›</span>
          <span className="font-semibold uppercase">{call.incident_subtype || call.incident_type}</span>
          <Badge className="bg-red-600">ACTIVE</Badge>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>75°</span>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            <span>3mph</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            <span>1 in 2hrs</span>
          </div>
          <div className="px-3 py-1 rounded bg-red-600 text-xs font-semibold">
            {new Date().toLocaleTimeString()} UT LIVE
          </div>
          <Button variant="ghost" onClick={onClose} className="text-gray-300 hover:text-white">
            Close
          </Button>
        </div>
      </header>

      {/* Main layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Mini Toolbar */}
        <div className="w-14 bg-gray-950 border-r border-gray-900 flex flex-col items-center py-4 gap-6">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white"
            onClick={onClose}
            title="Back to dashboard"
          >
            <PanelLeftClose className="w-5 h-5" />
          </Button>
          <div className="flex flex-col items-center gap-4 text-gray-500">
            <Button variant="default" size="icon" className="bg-blue-600 text-white hover:bg-blue-700" title="Overview">
              <Lightbulb className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white" title="Routes">
              <Radio className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-white" title="Dispatch center">
              <Shield className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-white" title="Reports">
              <ClipboardCheck className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-500 hover:text-white" title="Settings">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Left Timeline */}
        <div className="w-96 bg-gray-900 border-r border-gray-800 flex flex-col">
          <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between">
            <h2 className="text-sm font-semibold">Units status update</h2>
            <Badge variant="outline" className="text-xs">
              23 updates
            </Badge>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              {timeline.map((item, idx) => (
                <div key={item.id} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        item.status === 'completed'
                          ? 'bg-green-500'
                          : item.status === 'executing'
                          ? 'bg-blue-500 animate-pulse'
                          : item.status === 'pending'
                          ? 'bg-yellow-500'
                          : 'bg-gray-600 animate-pulse'
                      }`}
                    />
                    {idx !== timeline.length - 1 && (
                      <div className="flex-1 w-px bg-gray-700 mt-1" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TimelineBadge status={item.status} />
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(item.updatedAt).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400 flex items-center gap-2 mt-1">
                      <Radio className="w-3 h-3 text-blue-400" />
                      <span>{item.unit}</span>
                      {item.eta && (
                        <span className="ml-2 text-gray-500">ETA: {item.eta}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Center Map */}
        <div className="flex-1 relative">
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-gray-900 px-4 py-2 rounded-full shadow-lg text-sm font-semibold">
            3:33 minutes (2.1 mi) • Best route based on traffic conditions
          </div>
          {arrivalMessage && (
            <div className="absolute top-6 left-6 z-[3000] bg-black/80 text-gray-100 px-4 py-3 rounded-lg shadow-lg border border-gray-700 text-sm">
              {arrivalMessage}
            </div>
          )}
          {toastMessage && (
            <div className="absolute top-20 left-6 z-[3000] bg-black/85 text-gray-200 px-4 py-3 rounded-lg shadow-lg border border-green-500/40 text-sm flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span>{toastMessage}</span>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white ml-4"
                onClick={() => setToastMessage(null)}
              >
                Dismiss
              </Button>
            </div>
          )}
          {confirmOpen && (
            <div className="absolute inset-0 z-[2500] bg-black/60 backdrop-blur-sm pointer-events-none" />
          )}
          <EmergencyMap calls={calls} selectedCallId={call.id} onMarkerClick={() => {}} />
        </div>

        {/* Right Action Panel */}
        <div className="w-80 bg-gray-900 border-l border-gray-800 flex flex-col">
          <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between">
            <h2 className="text-sm font-semibold">Fire Response Workflow</h2>
            <Badge variant="outline" className="text-xs">
              ETA: 3:12:23 PM UT
            </Badge>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4 text-sm">
              <div>
                <h3 className="text-xs uppercase text-gray-500 mb-2">Workflow</h3>
                <div className="space-y-3">
                  <WorkflowStep label="Collect information" completed />
                  <WorkflowStep label="Dispatch police" completed={selectedPolice} />
                  <WorkflowStep label="Dispatch EMS" completed={selectedAmbulance} />
                  <WorkflowStep label="Notify incident managers" />
                </div>
              </div>

              <div className="space-y-3">
                <DispatchCard
                  title="Dispatch Police"
                  unit="PD 123"
                  location="Lewis Dr."
                  selected={selectedPolice}
                  onToggle={() => setSelectedPolice((prev) => !prev)}
                />
                <DispatchCard
                  title="Dispatch Ambulance"
                  unit="Unit 15"
                  location="9324 Lincoln Ave."
                  selected={selectedAmbulance}
                  onToggle={() => setSelectedAmbulance((prev) => !prev)}
                />
                <div className="bg-gray-800 rounded-lg border border-gray-700/50 p-3">
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-blue-400 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold">Forward information</div>
                      <div className="text-xs text-gray-400 mt-1">
                        Dispatch notification sent to command center and PD
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>

          <div className="px-4 py-3 border-t border-gray-800 flex gap-2">
            <Button variant="outline" className="flex-1">
              Change
            </Button>
            <Button
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              disabled={selectedUnits.length === 0}
              onClick={handleApprove}
            >
              Approve
            </Button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmOpen && (
        <div className="absolute inset-0 z-[5000] bg-black/70 backdrop-blur-md flex items-center justify-center">
          <div className="bg-gray-900 border border-gray-700 rounded-xl shadow-2xl w-[420px] p-6 space-y-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold">Confirm action</h3>
            </div>
            <p className="text-sm text-gray-400">
              Are you sure you want to dispatch the following units?
            </p>
            <div className="bg-gray-800 border border-gray-700 rounded-lg divide-y divide-gray-800">
              {selectedUnits.map((unit) => (
                <div key={unit.id} className="px-3 py-2 flex items-center justify-between text-sm">
                  <div>
                    <div className="font-medium">{unit.label}</div>
                    <div className="text-xs text-gray-500">
                      Distance: {unit.distance} • ETA: {unit.eta}
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="text-xs">
                    Edit
                  </Button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setConfirmOpen(false)}>
                Cancel
              </Button>
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={handleConfirmDispatch}>
                Dispatch Units
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface WorkflowStepProps {
  label: string;
  completed?: boolean;
}

function WorkflowStep({ label, completed }: WorkflowStepProps) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <div
        className={`w-3 h-3 rounded-full ${
          completed ? 'bg-blue-400' : 'border border-gray-600 bg-gray-800'
        }`}
      />
      <span className={completed ? 'text-white font-medium' : 'text-gray-400'}>{label}</span>
    </div>
  );
}

interface DispatchCardProps {
  title: string;
  unit: string;
  location: string;
  selected: boolean;
  onToggle: () => void;
}

function DispatchCard({ title, unit, location, selected, onToggle }: DispatchCardProps) {
  return (
    <div
      className={`rounded-lg border px-3 py-3 cursor-pointer transition ${
        selected ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 bg-gray-800 hover:border-blue-500'
      }`}
      onClick={onToggle}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${selected ? 'bg-blue-400' : 'bg-gray-600'}`} />
          <div>
            <div className="text-sm font-semibold">{title}</div>
            <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-2">
              <Radio className="w-3 h-3 text-blue-400" />
              <span>{unit}</span>
              <MapPin className="w-3 h-3 text-red-400" />
              <span>{location}</span>
            </div>
          </div>
        </div>
        <div className="text-xs text-blue-400">Ready</div>
      </div>
    </div>
  );
}

interface TimelineBadgeProps {
  status: TimelineStatus;
}

function TimelineBadge({ status }: TimelineBadgeProps) {
  const config: Record<TimelineStatus, { label: string; className: string }> = {
    loading: { label: 'Loading', className: 'bg-gray-800 text-gray-300 border border-gray-600' },
    executing: { label: 'Executing', className: 'bg-blue-500/20 text-blue-300 border border-blue-500/40' },
    pending: { label: 'Pending', className: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40' },
    completed: { label: 'Completed', className: 'bg-green-500/20 text-green-300 border border-green-500/40' },
  };
  const { label, className } = config[status];
  return (
    <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wide ${className}`}>
      {label}
    </span>
  );
}

