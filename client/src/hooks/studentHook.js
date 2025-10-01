import { adminServices } from "@/services/adminServices";
import { useQuery } from "@tanstack/react-query";

const fetchStudents = async () => {
  const res = await adminServices.getStudents();
  return res;
};

export function useStudents() {
  return useQuery({
    queryKey: ["students"],
    queryFn: fetchStudents,

    staleTime: 1000 * 60 * 5, // 5 minutes: data considered "fresh"
    cacheTime: 1000 * 60 * 30, // 30 minutes: keeps cache even if unused
    retry: 1, // only retry once on failure
    refetchOnWindowFocus: true, // don’t spam API when switching tabs
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
}
