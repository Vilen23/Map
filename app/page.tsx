"use client";
import Navbar from '@/Components/Navbar';
import { inputAtom } from '@/store/atoms';
import dynamic from 'next/dynamic'
import { useRecoilValue } from 'recoil';
const DynamicMap = dynamic(() => import('@/Components/Map'), {
  ssr: false
});

export default function Home() {
  const input = useRecoilValue(inputAtom);
  return (
    <div>
      <Navbar/>
      <DynamicMap Loc1={input.Loc1} Loc2={input.Loc2} distance={input.distance} speed={input.speed} />
    </div>
  )
}