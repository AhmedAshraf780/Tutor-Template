import { authService } from "@/services/auth.js";
import { useQuery } from "@tanstack/react-query";
const fetchUser = async () => {
  const res = await authService.isLogged();
  return res;
};

export function useWhoAmI() {
  return useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    staleTime: 0,
    retry: false,
  });
}
