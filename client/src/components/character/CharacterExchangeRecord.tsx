import { useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCharacter } from "@/contexts/CharacterContext";
import { useCharacterResource } from "@/contexts/CharacterResourceContext";
import CharacterScrollPanel from "./CharacterScrollPanel";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function CharacterExchangeRecord() {
  const { characterDetail } = useCharacter();
  const { records, fetchRecords, loading } = useCharacterResource();

  useEffect(() => {
    if (characterDetail?.uuid) {
      fetchRecords(characterDetail.uuid);
    }
  }, [characterDetail?.uuid, fetchRecords]);

  return (
    <div className="grid gap-4">
      <div className="col-span-full">
        <CharacterScrollPanel title="兑换记录">
          {loading ? (
            <div className="space-y-3">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
            </div>
          ) : records.length === 0 ? (
            <Alert variant="default" className="bg-muted">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>没有兑换记录</AlertDescription>
            </Alert>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>说明</TableHead>
                  <TableHead>点数变化</TableHead>
                  <TableHead>积分变化</TableHead>
                  <TableHead>经验变化</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>{record.description}</TableCell>
                    <TableCell>{record.branchPoint}</TableCell>
                    <TableCell>{record.credit}</TableCell>
                    <TableCell>{record.experience}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CharacterScrollPanel>
      </div>
    </div>
  );
}