'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { AGENTS, TEAM } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { HeroStat, StatFormat } from '@/types';

interface HeroProps {
  heroStats: HeroStat[];
}

function formatStatValue(value: number, format: StatFormat): string {
  switch (format) {
    case 'currency':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }).format(value);
    case 'days':
      return `${value}`;
    case 'number':
      return new Intl.NumberFormat('en-US').format(value);
    case 'percent':
      return `${value.toFixed(1)}%`;
    default:
      return String(value);
  }
}

function formatStatSuffix(format: StatFormat): string {
  switch (format) {
    case 'days':
      return ' days';
    default:
      return '';
  }
}

function useAnimatedCounter(
  target: number,
  format: StatFormat,
  duration = 2000
): string {
  const [display, setDisplay] = useState('0');
  const frameRef = useRef<number>(0);
  const startRef = useRef<number | null>(null);

  const animate = useCallback(
    (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      setDisplay(formatStatValue(current, format) + formatStatSuffix(format));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    },
    [target, format, duration]
  );

  useEffect(() => {
    startRef.current = null;
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [animate]);

  return display;
}

function AnimatedStat({ stat }: { stat: HeroStat }) {
  const display = useAnimatedCounter(stat.value, stat.format);
  const changeColor = stat.change >= 0 ? 'text-accent-400' : 'text-red-400';
  const changePrefix = stat.change >= 0 ? '+' : '';

  return (
    <div className="text-center">
      <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
        {display}
      </p>
      <p className="mt-1 text-sm text-primary-200 sm:text-base">{stat.label}</p>
      <p className={cn('mt-1 text-xs font-medium sm:text-sm', changeColor)}>
        {changePrefix}
        {stat.change.toFixed(1)}% YoY
      </p>
    </div>
  );
}

export function Hero({ heroStats }: HeroProps) {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700"
      aria-label="Hero"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-secondary-400 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-accent-500 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
        {/* Gold accent line */}
        <div className="mb-8 flex justify-center">
          <div className="h-1 w-16 rounded-full bg-secondary-400" />
        </div>

        {/* Heading */}
        <h1 className="text-center font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Lincoln Residential Intelligence
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-primary-200 sm:text-xl">
          Data-driven advisory and inspection-informed market intelligence
          for Lincoln, Nebraska real estate.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild href="/neighborhoods" size="lg">
            Explore Neighborhoods
          </Button>
          <Button
            asChild
            href="/sell-your-home"
            variant="secondary"
            size="lg"
            className="border-secondary-400 text-secondary-400 hover:bg-secondary-400 hover:text-primary-900"
          >
            Get Property Assessment
          </Button>
        </div>

        {/* Team callout */}
        <div className="mt-14 flex flex-col items-center gap-5">
          <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-secondary-400/60 shadow-lg shadow-black/20 sm:h-24 sm:w-24">
            <Image
              src="/images/team/marion-shawndel-polivka.jpg"
              alt={`${AGENTS.marion.name} & ${AGENTS.shawndel.name}`}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold tracking-wide text-secondary-400">
              {AGENTS.marion.name} &amp; {AGENTS.shawndel.name}
            </p>
            <p className="mt-1 text-xs text-primary-300">
              {TEAM.structure} · {TEAM.brokerage} · {TEAM.combinedExperience} combined experience
            </p>
          </div>
        </div>

        {/* Animated stat counters */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-12">
          {heroStats.map((stat) => (
            <AnimatedStat key={stat.label} stat={stat} />
          ))}
        </div>

        {/* Bottom gold accent line */}
        <div className="mt-16 flex justify-center">
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-secondary-400 to-transparent" />
        </div>
      </div>
    </section>
  );
}
