import { useQuery } from "@tanstack/react-query";
import { studentServices } from "@/services/studentServices";

const fetchAssignments = async (id) => {
  const res = await studentServices.getAssignements(id);
  return res;
};

export function useAssignments(id) {
  return useQuery({
    queryKey: ["assignments", id],
    queryFn: () => fetchAssignments(id),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchOnMount: true,
  });
}
