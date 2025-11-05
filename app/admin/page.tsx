"use client";
import * as React from "react";
import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, Phone, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getBusinessInfo } from "@/lib/template-config";

// Mock lead data for demo purposes
export interface Lead {
  id: string;
  created_at: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  message: string;
  service_type: string;
  urgency: "Low" | "Medium" | "High";
  status: "New" | "Contacted" | "Qualified";
}

// Generate dynamic dates relative to today
const now = Date.now();
const MOCK_LEADS: Lead[] = [
  {
    id: "1",
    created_at: new Date(now - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    customer_name: "John Martinez",
    customer_phone: "(312) 555-0123",
    customer_email: "john.martinez@email.com",
    message: "AC not cooling properly. Need someone to come take a look ASAP.",
    service_type: "AC Repair",
    urgency: "High",
    status: "New"
  },
  {
    id: "2",
    created_at: new Date(now - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    customer_name: "Sarah Johnson",
    customer_phone: "(312) 555-0198",
    customer_email: "s.johnson@email.com",
    message: "Looking for a quote on a new furnace installation. Current one is 15 years old.",
    service_type: "Heating Installation",
    urgency: "Medium",
    status: "New"
  },
  {
    id: "3",
    created_at: new Date(now - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    customer_name: "Michael Chen",
    customer_phone: "(312) 555-0167",
    customer_email: "mchen@email.com",
    message: "Interested in setting up a maintenance contract for my commercial property.",
    service_type: "Maintenance Contract",
    urgency: "Low",
    status: "Contacted"
  },
  {
    id: "4",
    created_at: new Date(now - 1 * 24 * 60 * 60 * 1000 - 3 * 60 * 60 * 1000).toISOString(), // 1 day + 3 hours ago
    customer_name: "Emily Rodriguez",
    customer_phone: "(312) 555-0145",
    customer_email: "emily.r@email.com",
    message: "Heater making strange noises. Can you come out today or tomorrow?",
    service_type: "Heating Repair",
    urgency: "High",
    status: "New"
  },
  {
    id: "5",
    created_at: new Date(now - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    customer_name: "David Thompson",
    customer_phone: "(312) 555-0189",
    customer_email: "d.thompson@email.com",
    message: "Need estimate for ductwork replacement in a 2000 sq ft home.",
    service_type: "Ductwork",
    urgency: "Low",
    status: "Qualified"
  },
  {
    id: "6",
    created_at: new Date(now - 2 * 24 * 60 * 60 * 1000 - 6 * 60 * 60 * 1000).toISOString(), // 2 days + 6 hours ago
    customer_name: "Jennifer Lee",
    customer_phone: "(312) 555-0134",
    customer_email: "jlee@email.com",
    message: "Emergency! No heat and it's freezing. Family with young kids.",
    service_type: "Emergency Repair",
    urgency: "High",
    status: "Contacted"
  },
  {
    id: "7",
    created_at: new Date(now - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    customer_name: "Robert Wilson",
    customer_phone: "(312) 555-0156",
    customer_email: "rwilson@email.com",
    message: "Looking for annual maintenance service. What's included in your plan?",
    service_type: "Maintenance",
    urgency: "Low",
    status: "Contacted"
  },
  {
    id: "8",
    created_at: new Date(now - 3 * 24 * 60 * 60 * 1000 - 12 * 60 * 60 * 1000).toISOString(), // 3 days + 12 hours ago
    customer_name: "Amanda Garcia",
    customer_phone: "(312) 555-0178",
    customer_email: "agarcia@email.com",
    message: "AC unit is 10 years old. Should I repair or replace? Need advice.",
    service_type: "AC Service",
    urgency: "Medium",
    status: "New"
  },
  {
    id: "9",
    created_at: new Date(now - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
    customer_name: "James Brown",
    customer_phone: "(312) 555-0192",
    customer_email: "jbrown@email.com",
    message: "Need quote for new HVAC system for a 3-bedroom house.",
    service_type: "System Installation",
    urgency: "Medium",
    status: "Qualified"
  },
  {
    id: "10",
    created_at: new Date(now - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    customer_name: "Lisa Anderson",
    customer_phone: "(312) 555-0143",
    customer_email: "landerson@email.com",
    message: "Thermostat not working properly. Might need replacement.",
    service_type: "Thermostat Repair",
    urgency: "Low",
    status: "Contacted"
  },
  {
    id: "11",
    created_at: new Date(now - 5 * 24 * 60 * 60 * 1000 - 8 * 60 * 60 * 1000).toISOString(), // 5 days + 8 hours ago
    customer_name: "Daniel Kim",
    customer_phone: "(312) 555-0187",
    customer_email: "dkim@email.com",
    message: "Commercial building needs HVAC inspection before winter. 5000 sq ft.",
    service_type: "Commercial Service",
    urgency: "Medium",
    status: "New"
  },
  {
    id: "12",
    created_at: new Date(now - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
    customer_name: "Patricia Moore",
    customer_phone: "(312) 555-0165",
    customer_email: "pmoore@email.com",
    message: "Air quality concerns. Interested in air purification systems.",
    service_type: "Air Quality",
    urgency: "Low",
    status: "Qualified"
  }
];

export default function AdminDashboard() {
  const business = getBusinessInfo();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRowExpanded = (rowId: string) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(rowId)) {
      newExpandedRows.delete(rowId);
    } else {
      newExpandedRows.add(rowId);
    }
    setExpandedRows(newExpandedRows);
  };

// Define table columns
const columns: ColumnDef<Lead>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "customer_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue("customer_name")}</div>,
  },
  {
    accessorKey: "service_type",
    header: "Service",
    cell: ({ row }) => <div>{row.getValue("service_type")}</div>,
  },
  {
    accessorKey: "urgency",
    header: "Urgency",
    cell: ({ row }) => {
      const urgency = row.getValue("urgency") as string;
      const colors = {
        High: "text-red-600 bg-red-50 dark:bg-red-950/30 dark:text-red-400",
        Medium: "text-yellow-600 bg-yellow-50 dark:bg-yellow-950/30 dark:text-yellow-400",
        Low: "text-green-600 bg-green-50 dark:bg-green-950/30 dark:text-green-400",
      };
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[urgency as keyof typeof colors]}`}>
          {urgency}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const colors = {
        New: "text-blue-600 bg-blue-50 dark:bg-blue-950/30 dark:text-blue-400",
        Contacted: "text-purple-600 bg-purple-50 dark:bg-purple-950/30 dark:text-purple-400",
        Qualified: "text-green-600 bg-green-50 dark:bg-green-950/30 dark:text-green-400",
      };
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status as keyof typeof colors]}`}>
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      return (
        <div className="text-sm">
          {date.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const lead = row.original;
      const isExpanded = expandedRows.has(lead.id);

      return (
        <div className="flex items-center gap-2">
          <a href={`tel:${lead.customer_phone}`}>
            <Button variant="default" size="sm" className="gap-1">
              <Phone className="h-4 w-4" />
              Call
            </Button>
          </a>
          <a href={`mailto:${lead.customer_email}`}>
            <Button variant="secondary" size="sm" className="gap-1">
              <Mail className="h-4 w-4" />
              Email
            </Button>
          </a>
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleRowExpanded(lead.id)}
          >
            {isExpanded ? "Hide Details" : "View More"}
          </Button>
        </div>
      );
    },
  },
];

  const table = useReactTable({
    data: MOCK_LEADS,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const exportToCSV = () => {
    const headers = ["Date", "Name", "Phone", "Email", "Service Type", "Urgency", "Status", "Message"];
    const rows = MOCK_LEADS.map(sub => [
      new Date(sub.created_at).toLocaleString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }),
      sub.customer_name,
      sub.customer_phone,
      sub.customer_email,
      sub.service_type,
      sub.urgency,
      sub.status,
      sub.message.replace(/"/g, '""'),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${business.name}-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Lead Dashboard
              </h1>
              <p className="text-muted-foreground">
                {business.name} - {MOCK_LEADS.length} total leads
              </p>
            </div>
            <div className="flex gap-3">
              <Button onClick={exportToCSV} variant="outline">
                Export CSV
              </Button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-4 mb-4">
            <Input
              placeholder="Filter by name..."
              value={(table.getColumn("customer_name")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("customer_name")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Columns <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id.replace("_", " ")}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => {
                    const lead = row.original;
                    const isExpanded = expandedRows.has(lead.id);

                    return (
                      <React.Fragment key={row.id}>
                        <TableRow data-state={row.getIsSelected() && "selected"}>
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                        {isExpanded && (
                          <TableRow>
                            <TableCell colSpan={columns.length} className="bg-muted/50 p-0">
                              <div className="p-6 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  {/* Contact Information */}
                                  <div className="space-y-3">
                                    <h4 className="text-sm font-semibold text-muted-foreground">Contact Information</h4>
                                    <div className="space-y-2">
                                      <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <a href={`tel:${lead.customer_phone}`} className="text-sm text-primary hover:underline">
                                          {lead.customer_phone}
                                        </a>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <a href={`mailto:${lead.customer_email}`} className="text-sm text-primary hover:underline">
                                          {lead.customer_email}
                                        </a>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Lead Details */}
                                  <div className="space-y-3">
                                    <h4 className="text-sm font-semibold text-muted-foreground">Lead Details</h4>
                                    <div className="space-y-2 text-sm">
                                      <div>
                                        <span className="font-medium">Service Type:</span> {lead.service_type}
                                      </div>
                                      <div>
                                        <span className="font-medium">Received:</span>{" "}
                                        {new Date(lead.created_at).toLocaleString('en-US', {
                                          month: 'numeric',
                                          day: 'numeric',
                                          year: 'numeric',
                                          hour: 'numeric',
                                          minute: '2-digit',
                                          hour12: true
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Message */}
                                <div className="space-y-3">
                                  <h4 className="text-sm font-semibold text-muted-foreground">Message</h4>
                                  <div className="bg-background rounded-lg p-4 border">
                                    <p className="text-sm">{lead.message}</p>
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>Demo: Showing {MOCK_LEADS.length} example leads</p>
        </div>
      </div>
    </div>
  );
}
