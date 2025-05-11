import { cn } from "@/lib/utils";

interface TerminalProps {
  title?: string;
  className?: string;
  children: React.ReactNode;
}

export function Terminal({ title, className, children }: TerminalProps) {
  return (
    <div className={cn("bg-gray-800 rounded-lg shadow-lg overflow-hidden", className)}>
      <div className="flex items-center px-4 py-2 bg-gray-900">
        <div className="flex space-x-1">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        {title && (
          <div className="ml-4 text-gray-100 font-mono text-sm">
            {title}
          </div>
        )}
      </div>
      <div className="terminal p-4 overflow-x-auto text-sm">
        <pre className="text-gray-100">
          {children}
        </pre>
      </div>
    </div>
  );
}
