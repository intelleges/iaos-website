import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

type FilterEvent = "all" | "bounced" | "opened" | "clicked" | "spam" | "unsubscribed";

export function EmailAnalyticsPage() {
  const [search, setSearch] = useState("");
  const [filterEvent, setFilterEvent] = useState<FilterEvent>("all");
  const [offset, setOffset] = useState(0);
  const limit = 25;

  const overviewQuery = trpc.emailAnalytics.overview.useQuery();
  const listQuery = trpc.emailAnalytics.listStatus.useQuery(
    { search, filterEvent, limit, offset },
    { keepPreviousData: true }
  );

  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const timelineQuery = trpc.emailAnalytics.getEmailTimeline.useQuery(
    { email: selectedEmail || "nobody@example.com" },
    { enabled: !!selectedEmail }
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOffset(0);
    listQuery.refetch();
  };

  const totalPages = listQuery.data
    ? Math.ceil(listQuery.data.total / limit)
    : 0;
  const currentPage = Math.floor(offset / limit) + 1;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Email Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Monitor deliverability, engagement, and issues (bounces, spam, unsubscribes) across all Intelleges emails.
          </p>
        </div>

        {/* Overview cards */}
        {overviewQuery.isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : overviewQuery.error ? (
          <Alert variant="destructive">
            <AlertTitle>Error Loading Overview</AlertTitle>
            <AlertDescription>
              {overviewQuery.error.message || "Could not load analytics overview"}
            </AlertDescription>
          </Alert>
        ) : (
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            <StatCard
              title="Tracked Emails"
              value={overviewQuery.data?.totalTrackedEmails ?? 0}
              subtitle="Unique addresses"
            />
            <StatCard
              title="Delivered"
              value={overviewQuery.data?.totalDelivered ?? 0}
              subtitle={`Open rate: ${formatPercent(overviewQuery.data?.openRate ?? 0)}`}
            />
            <StatCard
              title="Bounced"
              value={overviewQuery.data?.totalBounced ?? 0}
              subtitle={`Bounce rate: ${formatPercent(overviewQuery.data?.bounceRate ?? 0)}`}
              variant="warning"
            />
            <StatCard
              title="Opened"
              value={overviewQuery.data?.totalOpened ?? 0}
              subtitle={`Click rate: ${formatPercent(overviewQuery.data?.clickRate ?? 0)}`}
            />
            <StatCard
              title="Clicked"
              value={overviewQuery.data?.totalClicked ?? 0}
              subtitle=""
            />
            <StatCard
              title="Unsubscribed"
              value={overviewQuery.data?.totalUnsubscribed ?? 0}
              subtitle={`Spam: ${overviewQuery.data?.totalSpam ?? 0}`}
              variant="warning"
            />
          </div>
        )}

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Email Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSearchSubmit} className="flex flex-wrap gap-3 items-end">
              <div className="flex-1 min-w-[220px]">
                <label className="text-xs font-medium mb-1 block" htmlFor="search">
                  Search by email
                </label>
                <Input
                  id="search"
                  placeholder="someone@company.com"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>

              <div className="w-[200px]">
                <label className="text-xs font-medium mb-1 block" htmlFor="eventFilter">
                  Filter by status
                </label>
                <Select
                  value={filterEvent}
                  onValueChange={value => {
                    setFilterEvent(value as FilterEvent);
                    setOffset(0);
                  }}
                >
                  <SelectTrigger id="eventFilter">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="bounced">Bounced</SelectItem>
                    <SelectItem value="opened">Opened</SelectItem>
                    <SelectItem value="clicked">Clicked</SelectItem>
                    <SelectItem value="spam">Spam</SelectItem>
                    <SelectItem value="unsubscribed">Unsubscribed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" disabled={listQuery.isLoading}>
                {listQuery.isLoading ? "Loading..." : "Apply"}
              </Button>
            </form>

            {/* Table */}
            <div className="border rounded-lg overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr className="text-left">
                    <th className="px-3 py-2 font-medium">Email</th>
                    <th className="px-3 py-2 font-medium">Last Event</th>
                    <th className="px-3 py-2 font-medium text-center">Delivered</th>
                    <th className="px-3 py-2 font-medium text-center">Opened</th>
                    <th className="px-3 py-2 font-medium text-center">Clicked</th>
                    <th className="px-3 py-2 font-medium text-center">Bounced</th>
                    <th className="px-3 py-2 font-medium text-center">Unsubscribed</th>
                    <th className="px-3 py-2 font-medium">Last Event At</th>
                  </tr>
                </thead>
                <tbody>
                  {listQuery.data?.rows?.length ? (
                    listQuery.data.rows.map(row => (
                      <tr
                        key={row.id}
                        className={`border-t hover:bg-muted/40 cursor-pointer transition-colors ${
                          selectedEmail === row.email ? "bg-muted/60" : ""
                        }`}
                        onClick={() => setSelectedEmail(row.email)}
                      >
                        <td className="px-3 py-2 font-mono text-xs">{row.email}</td>
                        <td className="px-3 py-2">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-muted">
                            {row.lastEvent ?? "-"}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-center">{row.delivered ? "✓" : ""}</td>
                        <td className="px-3 py-2 text-center">{row.opened ? "✓" : ""}</td>
                        <td className="px-3 py-2 text-center">{row.clicked ? "✓" : ""}</td>
                        <td className="px-3 py-2 text-center">{row.bounce ? "⚠️" : ""}</td>
                        <td className="px-3 py-2 text-center">{row.unsubscribed ? "🚫" : ""}</td>
                        <td className="px-3 py-2 text-xs text-muted-foreground">
                          {row.lastEventAt ? new Date(row.lastEventAt).toLocaleString() : "-"}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="px-3 py-8 text-center text-muted-foreground" colSpan={8}>
                        {listQuery.isLoading ? (
                          <div className="flex items-center justify-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Loading...
                          </div>
                        ) : (
                          "No records found."
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {listQuery.data && totalPages > 1 && (
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-muted-foreground">
                  Page {currentPage} of {totalPages} ({listQuery.data.total} total)
                </span>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={offset === 0}
                    onClick={() => setOffset(Math.max(0, offset - limit))}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={offset + limit >= (listQuery.data?.total ?? 0)}
                    onClick={() => setOffset(offset + limit)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Timeline panel */}
        {selectedEmail && (
          <Card>
            <CardHeader>
              <CardTitle>Email Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">
                History for: <span className="font-mono font-semibold">{selectedEmail}</span>
              </p>

              {timelineQuery.isLoading && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <p className="text-sm">Loading timeline...</p>
                </div>
              )}

              {timelineQuery.error && (
                <Alert variant="destructive" className="mb-2">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    Could not load timeline. Try again later.
                  </AlertDescription>
                </Alert>
              )}

              {timelineQuery.data && timelineQuery.data.length === 0 && (
                <p className="text-sm text-muted-foreground">No events recorded yet for this email.</p>
              )}

              {timelineQuery.data && timelineQuery.data.length > 0 && (
                <ul className="space-y-3 text-sm">
                  {timelineQuery.data.map(ev => (
                    <li key={ev.id} className="flex items-start gap-3 border-b pb-3 last:border-b-0">
                      <span className="mt-[2px] text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                        {ev.eventType}
                      </span>
                      <div className="flex-1">
                        <div className="font-medium">
                          {new Date(ev.timestamp).toLocaleString()}
                        </div>
                        {ev.reason && (
                          <div className="text-xs text-muted-foreground mt-1">
                            Reason: {ev.reason}
                          </div>
                        )}
                        {ev.sgMessageId && (
                          <div className="text-[10px] text-muted-foreground mt-1 font-mono">
                            msg: {ev.sgMessageId}
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

function StatCard(props: { title: string; value: number; subtitle?: string; variant?: "default" | "warning" }) {
  return (
    <Card className={props.variant === "warning" ? "border-orange-200 dark:border-orange-900" : ""}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {props.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-semibold ${props.variant === "warning" ? "text-orange-600 dark:text-orange-400" : ""}`}>
          {props.value.toLocaleString()}
        </div>
        {props.subtitle && (
          <div className="text-xs text-muted-foreground mt-1">{props.subtitle}</div>
        )}
      </CardContent>
    </Card>
  );
}

function formatPercent(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}
