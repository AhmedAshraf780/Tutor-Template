import { useQuery } from "@tanstack/react-query";
import { studentServices } from "@/services/studentServices";

const fetchNotes = async () => {
  const res = await studentServices.getNotes();
  console.log("hola");
  return res;
};

export function useNotes() {
  return useQuery({
    queryKey: ["notes"],
    queryFn: () => fetchNotes(),
    initialData: [],
    staleTime: 1000 * 60,
    cacheTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnMount: true,
  });
}
