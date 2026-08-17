"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface SidebarContextValue {
    isCollapsed: boolean;
    setIsCollapsed: (value: boolean | ((prev: boolean) => boolean)) => void;
    toggleCollapse: () => void;
}

const SidebarContext = createContext<SidebarContextValue | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const toggleCollapse = () => setIsCollapsed(prev => !prev);

    return (
        <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed, toggleCollapse }}>
            {children}
        </SidebarContext.Provider>
    );
}

export function useSidebar() {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
}
