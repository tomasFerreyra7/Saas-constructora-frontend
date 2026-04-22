import { useQuery } from "@tanstack/react-query";
import { Project } from "../components/columns";
import { api } from "@/lib/api";

export const getProjects = async (): Promise<Project[]> => {
    const { data } = await api.get("/projects");
    return data;
};

export const useGetProjects = () => {
    return useQuery({
        queryKey: ["projects"],
        queryFn: getProjects,
    });
};
