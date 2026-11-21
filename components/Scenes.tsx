'use client';
import dynamic from 'next/dynamic';

export const HeroScene = dynamic(() => import('./HeroCanvas'), { ssr: false });
export const TechScene = dynamic(() => import('./TechSphere'), { ssr: false });
export const PageScene = dynamic(() => import('./PageCanvas'), { ssr: false });
