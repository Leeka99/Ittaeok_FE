import { ChevronRight, Link2, Pen } from "lucide-react";
import githubIcon from "@/assets/icon/github_icon.svg";
import notionIcon from "@/assets/icon/notion_icon.svg";
import figmaIcon from "@/assets/icon/figma_icon.svg";
import googleDocsIcon from "@/assets/icon/googledocs_icon.svg";
import miroIcon from "@/assets/icon/miro_icon.svg";
import canvaIcon from "@/assets/icon/canva_icon.svg";
import Image from "next/image";
import Link from "next/link";

type Platform =
  | "GITHUB"
  | "NOTION"
  | "FIGMA"
  | "GOOGLE_DOCS"
  | "MIRO"
  | "CANVA";
interface WorkSpaceProps {
  workspaces:
    | {
        platform: Platform;
        name: string;
      }[]
    | null;
  scheduleId: string;
}

const WorkSpace = ({ scheduleId, workspaces }: WorkSpaceProps) => {
  const PLATFORM = {
    GITHUB: githubIcon,
    NOTION: notionIcon,
    FIGMA: figmaIcon,
    GOOGLE_DOCS: googleDocsIcon,
    MIRO: miroIcon,
    CANVA: canvaIcon,
  };

  return (
    <div className="bg-[color:var(--color-white)] px-5 py-4 gap-4 rounded-lg flex flex-col shadow-[var(--shadow-common)]">
      <div className="flex w-full justify-between items-center">
        <div className="flex gap-4 items-center">
          <div>
            <Link2 className="w-4 h-4 text-[color:var(--color-black)]" />
          </div>
          <div className="text-[color:var(--color-primary-300)] text-xs">
            워크 스페이스
          </div>
        </div>
        <Link href={`/schedule/${scheduleId}/edit/workspace`}>
          <Pen className="w-3 h-3 text-[color:var(--color-gray)] cursor-pointer" />
        </Link>
      </div>
      <div className="flex flex-col gap-3 w-full">
        {(!workspaces || workspaces.length === 0) && (
          <div className="flex w-full justify-center items-center py-4 text-xs text-[color:var(--color-gray)]">
            연동된 워크스페이스가 없습니다.
          </div>
        )}
        {workspaces &&
          workspaces.map((workspace, i) => (
            <div
              className="flex w-full justify-between items-center"
              key={`${workspace.name}-${i}`}
            >
              <div className="flex gap-4 items-center">
                <div>
                  <Image
                    src={PLATFORM[workspace.platform]}
                    alt={`${PLATFORM[workspace.platform]} 아이콘`}
                    className="w-4 h-4"
                  />
                </div>
                <div className="text-[color:var(--color-black)] text-sm">
                  {workspace.name}
                </div>
              </div>
              <div>
                <ChevronRight className="w-[14px] h-[14px] text-[color:var(--color-gray)]" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default WorkSpace;
