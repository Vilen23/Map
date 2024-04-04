"use client"
import { RecoilRoot } from "recoil"

export const Providers = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <RecoilRoot>
            {children}
        </RecoilRoot>
    )
}