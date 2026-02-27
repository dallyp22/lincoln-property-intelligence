import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import type { School } from '@/types';

interface SchoolInfoProps {
  schools: School[];
}

const typeLabels: Record<School['type'], string> = {
  elementary: 'Elementary',
  middle: 'Middle',
  high: 'High School',
};

const typeColors: Record<School['type'], string> = {
  elementary: '#059669',
  middle: '#2563eb',
  high: '#7c3aed',
};

function RatingBar({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 rounded-full bg-surface-100 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${(rating / 10) * 100}%`,
            backgroundColor:
              rating >= 8 ? '#059669' : rating >= 6 ? '#d4af37' : '#dc2626',
          }}
        />
      </div>
      <span className="text-sm font-bold text-primary-900 tabular-nums w-8 text-right">
        {rating}/10
      </span>
    </div>
  );
}

export function SchoolInfo({ schools }: SchoolInfoProps) {
  if (schools.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold font-serif text-primary-900 mb-6">
        Schools
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {schools.map((school) => (
          <Card key={school.name} padding="md" hover>
            <CardContent>
              <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="text-base font-semibold text-primary-900 leading-tight">
                  {school.name}
                </h3>
                <Badge color={typeColors[school.type]} size="sm">
                  {typeLabels[school.type]}
                </Badge>
              </div>
              <RatingBar rating={school.rating} />
              <p className="mt-3 text-xs text-primary-400">
                {school.district}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
