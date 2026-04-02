'use client';

import { FileText, TrendingUp } from 'lucide-react';

import { Flex, Text } from '@/components/ui';
import { usePosts } from '@/hooks/use-posts';

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  description?: string;
}

export function DashboardStats() {
  const { data: posts = [] } = usePosts();
  const totalPosts = posts.length;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <StatsCard
        icon={<FileText className="size-4" />}
        label="전체 게시글"
        value={totalPosts}
        description="작성된 게시글 수"
      />
      <StatsCard icon={<TrendingUp className="size-4" />} label="Google Analytics" value="—" description="연동 예정" />
    </div>
  );
}

function StatsCard({ icon, label, value, description }: StatsCardProps) {
  return (
    <Flex direction="column" className="gap-2 rounded-xl border border-border bg-background p-5">
      <Flex justifyContent="space-between" alignItems="center">
        <Text as="span" className="text-sm font-medium text-muted-foreground">
          {label}
        </Text>
        {icon}
      </Flex>

      <Text as="span" className="text-2xl font-bold">
        {value}
      </Text>

      {description && (
        <Text as="span" className="text-xs text-muted-foreground">
          {description}
        </Text>
      )}
    </Flex>
  );
}
