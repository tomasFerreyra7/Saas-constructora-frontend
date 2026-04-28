import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { User } from "../types";

export const useGetUsers = (enabled: boolean = true) => {
    return useQuery<User[]>({
        queryKey: ["users"],
        queryFn: async () => {
            const { data } = await api.get("/users");
            return data;
        },
        enabled,
    });
};
