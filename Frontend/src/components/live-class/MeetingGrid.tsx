"use client";

import { useMemo, useSyncExternalStore } from "react";
import { Video } from "lucide-react";
import { ParticipantView } from "@/components/live-class/ParticipantView";
import { ParticipantActivityTracker } from "@/components/live-class/ParticipantActivityTracker";
import { PresenterView } from "@/components/live-class/PresenterView";
import { participantActivityStore } from "@/lib/Participantactivitystore";
import { rankParticipants, getGridColsClass } from "@/lib/Participantranking";

const MAX_VISIBLE = 9;
const MAX_ACTIVE_SLOTS = 8;

interface MeetingGridProps {
  participantIds: string[];
  localParticipantId?: string;
  presenterId?: string | null;
}

export function MeetingGrid({
  participantIds,
  localParticipantId,
  presenterId,
}: MeetingGridProps) {
  const activity = useSyncExternalStore(
    participantActivityStore.subscribe,
    participantActivityStore.getSnapshot,
    participantActivityStore.getSnapshot
  );

  const isOverflowing = participantIds.length > MAX_VISIBLE;

  const { visibleIds, overflowCount, overflowNames } = useMemo(() => {
    if (!isOverflowing) {
      return {
        visibleIds: participantIds,
        overflowCount: 0,
        overflowNames: [] as string[],
      };
    }

    const ranked = rankParticipants(participantIds, activity, localParticipantId);
    const visible = ranked.slice(0, MAX_ACTIVE_SLOTS);
    const hidden = ranked.slice(MAX_ACTIVE_SLOTS);

    return {
      visibleIds: visible,
      overflowCount: hidden.length,
      overflowNames: hidden.map(
        (id) => activity.get(id)?.displayName ?? "Participant"
      ),
    };
  }, [participantIds, activity, isOverflowing, localParticipantId]);

  const tileCount = visibleIds.length + (overflowCount > 0 ? 1 : 0);

  if (presenterId) {
    return (
      <>
        {isOverflowing &&
          participantIds.map((id) => (
            <ParticipantActivityTracker key={id} participantId={id} />
          ))}

        {/* Presenter left, filmstrip right — stays within parent height */}
        <div className="w-full h-full flex gap-2 min-h-0 overflow-hidden">
          <div className="flex-1 min-w-0 min-h-0">
            <PresenterView presenterId={presenterId} />
          </div>

          {tileCount > 0 && (
            <div className="w-[108px] sm:w-[128px] shrink-0 h-full overflow-y-auto no-scrollbar flex flex-col gap-2 pr-0.5">
              {visibleIds.map((id) => (
                <div key={id} className="aspect-video w-full shrink-0">
                  <ParticipantView participantId={id} compact />
                </div>
              ))}
              {overflowCount > 0 && (
                <div className="aspect-video w-full shrink-0">
                  <OverflowTile count={overflowCount} names={overflowNames} compact />
                </div>
              )}
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      {isOverflowing &&
        participantIds.map((id) => (
          <ParticipantActivityTracker key={id} participantId={id} />
        ))}

      <div
        className={`w-full h-full grid gap-3 content-center overflow-hidden ${getGridColsClass(
          tileCount
        )}`}
      >
        {visibleIds.map((id) => (
          <ParticipantView key={id} participantId={id} />
        ))}

        {overflowCount > 0 && (
          <OverflowTile count={overflowCount} names={overflowNames} />
        )}

        {tileCount === 0 && (
          <div className="w-full h-full min-h-[200px] bg-slate-800/80 rounded-2xl flex items-center justify-center border border-slate-700">
            <div className="text-center text-white/50">
              <Video className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p className="text-sm font-medium">Waiting for participants…</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function OverflowTile({count,names,compact = false,}: { count: number; names: string[]; compact?: boolean; }) {
  return (
    <div
      className={`relative w-full h-full bg-slate-800 rounded-2xl overflow-hidden flex items-center justify-center border border-slate-700 ${
        compact ? "" : "min-h-[160px] sm:min-h-[200px]"
      }`}
      title={names.join(", ")}
    >
      <div className="flex flex-col items-center gap-1.5">
        <div
          className={`${
            compact ? "w-10 h-10 text-sm" : "w-14 h-14 text-lg"
          } rounded-full bg-slate-700 flex items-center justify-center text-white font-bold`}
        >
          +{count}
        </div>
        {!compact && (
          <p className="text-white/70 text-sm font-medium">
            more participant{count !== 1 ? "s" : ""}
          </p>
        )}
      </div>
    </div>
  );
}
