import { adminServices } from "@/services/adminServices";
import { useQuery } from "@tanstack/react-query";

const fetchGroups = async () => {
  const res = await adminServices.getMyGroups();
  return res;
};

export function useGroups() {
  return useQuery({
    queryKey: ["groups"],
    queryFn: fetchGroups,
    staleTime: 1000 * 60, // 5 minutes: data considered "fresh"
    cacheTime: 1000 * 60 * 30, // 30 minutes: keeps cache even if unused
    retry: 1, // only retry once on failure
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
}
