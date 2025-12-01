import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Link } from 'wouter';
import { ArrowLeft, Search, Filter, Eye, Clock, AlertCircle, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import SEO from '@/components/seo';
import { toast } from 'sonner';

type QuoteStatus = 'draft' | 'sent' | 'accepted' | 'rejected';

export default function QuoteHistory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<QuoteStatus | 'all'>('all');
  const [tierFilter, setTierFilter] = useState<string>('all');
  const [page, setPage] = useState(1);
  const pageSize = 25;

  // Fetch quotes with filters
  const quotesQuery = trpc.pricing.listQuotes.useQuery({
    page,
    pageSize,
    search: searchQuery || undefined,
    status: statusFilter === 'all' ? undefined : statusFilter,
    tier: tierFilter === 'all' ? undefined : tierFilter,
  });

  const updateStatusMutation = trpc.pricing.updateQuoteStatus.useMutation({
    onSuccess: () => {
      quotesQuery.refetch();
      toast.success('Quote status updated');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update status');
    },
  });

  const extendExpirationMutation = trpc.pricing.extendExpiration.useMutation({
    onSuccess: () => {
      quotesQuery.refetch();
      toast.success('Quote expiration extended by 30 days');
    },
    onError: () => {
      toast.error('Failed to extend expiration');
    },
  });

  const checkExpiredQuotesMutation = trpc.pricing.checkExpiredQuotes.useMutation({
    onSuccess: (result) => {
      quotesQuery.refetch();
      toast.success(`Sent ${result.remindersSent} reminders and ${result.expirationEmailsSent} expiration emails`);
    },
    onError: () => {
      toast.error('Failed to check expired quotes');
    },
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'draft':
        return 'secondary';
      case 'sent':
        return 'default';
      case 'accepted':
        return 'default'; // Green-ish
      case 'rejected':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getTierBadgeColor = (tier: string) => {
    switch (tier) {
      case 'Basic':
        return 'bg-blue-100 text-blue-800';
      case 'Professional':
        return 'bg-purple-100 text-purple-800';
      case 'Advanced':
        return 'bg-amber-100 text-amber-800';
      case 'Enterprise':
        return 'bg-emerald-100 text-emerald-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getExpirationStatus = (expiresAt: Date | string | null) => {
    if (!expiresAt) return { status: 'none', label: 'No expiration', color: 'gray' };
    
    const now = new Date();
    const expiration = new Date(expiresAt);
    const daysRemaining = Math.ceil((expiration.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (daysRemaining < 0) {
      return { status: 'expired', label: 'Expired', color: 'red', days: 0 };
    } else if (daysRemaining <= 7) {
      return { status: 'expiring_soon', label: `${daysRemaining}d left`, color: 'amber', days: daysRemaining };
    } else {
      return { status: 'active', label: `${daysRemaining}d left`, color: 'green', days: daysRemaining };
    }
  };

  const getExpirationBadge = (expiresAt: Date | string | null) => {
    const expStatus = getExpirationStatus(expiresAt);
    
    if (expStatus.status === 'none') return null;
    
    const icons = {
      expired: <XCircle className="w-3 h-3" />,
      expiring_soon: <AlertCircle className="w-3 h-3" />,
      active: <CheckCircle className="w-3 h-3" />,
    };

    const colors = {
      expired: 'bg-red-100 text-red-800 border-red-200',
      expiring_soon: 'bg-amber-100 text-amber-800 border-amber-200',
      active: 'bg-green-100 text-green-800 border-green-200',
    };

    return (
      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${colors[expStatus.status as keyof typeof colors]}`}>
        {icons[expStatus.status as keyof typeof icons]}
        {expStatus.label}
      </div>
    );
  };

  const handleStatusChange = async (quoteId: number, newStatus: QuoteStatus) => {
    await updateStatusMutation.mutateAsync({
      quoteId,
      status: newStatus,
    });
  };

  return (
    <>
      <SEO
        title="Quote History - Admin"
        description="View and manage pricing quotes"
      />

      <div className="min-h-screen bg-gradient-to-br from-[#F7F9FA] to-[#E8EEF2] py-8">
        <div className="container max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <Link href="/admin/pricing">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Calculator
              </Button>
            </Link>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-4xl font-bold text-[#111111] mb-2">
                  Quote History
                </h1>
                <p className="text-[#666666]">
                  View and manage all pricing quotes. Total quotes: {quotesQuery.data?.total || 0}
                </p>
              </div>
              <Button
                onClick={() => checkExpiredQuotesMutation.mutate()}
                disabled={checkExpiredQuotesMutation.isPending}
                variant="outline"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${checkExpiredQuotesMutation.isPending ? 'animate-spin' : ''}`} />
                Check Expirations
              </Button>
            </div>
          </div>

          {/* Filters */}
          <Card className="p-6 mb-6">
            <div className="grid md:grid-cols-4 gap-4">
              {/* Search */}
              <div>
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-[#666666]" />
                  <Input
                    id="search"
                    placeholder="Customer name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={statusFilter}
                  onValueChange={(value) => setStatusFilter(value as QuoteStatus | 'all')}
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="sent">Sent</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tier Filter */}
              <div>
                <Label htmlFor="tier">Tier</Label>
                <Select
                  value={tierFilter}
                  onValueChange={setTierFilter}
                >
                  <SelectTrigger id="tier">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tiers</SelectItem>
                    <SelectItem value="Basic">Basic</SelectItem>
                    <SelectItem value="Professional">Professional</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                    <SelectItem value="Enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Clear Filters */}
              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setStatusFilter('all');
                    setTierFilter('all');
                  }}
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </Card>

          {/* Quotes Table */}
          <Card className="p-6">
            {quotesQuery.isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A3A67] mx-auto"></div>
                <p className="mt-4 text-[#666666]">Loading quotes...</p>
              </div>
            ) : quotesQuery.data?.quotes.length === 0 ? (
              <div className="text-center py-12">
                <Filter className="h-12 w-12 text-[#CCCCCC] mx-auto mb-4" />
                <p className="text-[#666666]">No quotes found</p>
                <p className="text-sm text-[#999999] mt-2">
                  Try adjusting your filters or create a new quote
                </p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Tier</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Expiration</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {quotesQuery.data?.quotes.map((quote: any) => (
                        <TableRow key={quote.id}>
                          <TableCell className="font-mono text-sm">
                            #{quote.id}
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium text-[#111111]">
                                {quote.customerName || 'N/A'}
                              </div>
                              {quote.customerEmail && (
                                <div className="text-sm text-[#666666]">
                                  {quote.customerEmail}
                                </div>
                              )}
                              {quote.industry && (
                                <div className="text-xs text-[#999999]">
                                  {quote.industry}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getTierBadgeColor(quote.tier)}>
                              {quote.tier}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-semibold">
                            {formatCurrency(quote.totalPrice)}
                          </TableCell>
                          <TableCell>
                            <Select
                              value={quote.status || 'draft'}
                              onValueChange={(value) =>
                                handleStatusChange(quote.id, value as QuoteStatus)
                              }
                            >
                              <SelectTrigger className="w-32">
                                <Badge variant={getStatusBadgeVariant(quote.status || 'draft')}>
                                  {quote.status || 'draft'}
                                </Badge>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="draft">Draft</SelectItem>
                                <SelectItem value="sent">Sent</SelectItem>
                                <SelectItem value="accepted">Accepted</SelectItem>
                                <SelectItem value="rejected">Rejected</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              {getExpirationBadge(quote.expiresAt)}
                              {quote.expiresAt && (
                                <div className="text-xs text-gray-500">
                                  {formatDate(quote.expiresAt)}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-sm text-[#666666]">
                            {formatDate(quote.createdAt)}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Link href={`/admin/pricing?quoteId=${quote.id}`}>
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </Link>
                              {getExpirationStatus(quote.expiresAt).status === 'expired' && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => extendExpirationMutation.mutate({ id: quote.id })}
                                  disabled={extendExpirationMutation.isPending}
                                  title="Extend expiration by 30 days"
                                >
                                  <Clock className="w-3 h-3 mr-1" />
                                  Extend
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                {quotesQuery.data && quotesQuery.data.total > pageSize && (
                  <div className="flex items-center justify-between mt-6">
                    <div className="text-sm text-[#666666]">
                      Showing {(page - 1) * pageSize + 1} to{' '}
                      {Math.min(page * pageSize, quotesQuery.data.total)} of{' '}
                      {quotesQuery.data.total} quotes
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                      >
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setPage(page + 1)}
                        disabled={page * pageSize >= quotesQuery.data.total}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}
