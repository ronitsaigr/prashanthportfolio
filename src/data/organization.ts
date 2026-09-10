export type OrgNode = {
  id: string
  label: string
  detail: string
  x: number
  y: number
}

export const orgNodes: OrgNode[] = [
  { id: 'revenue', label: 'REVENUE', detail: 'leads / conversion / payments', x: 18, y: 27 },
  { id: 'product', label: 'PRODUCT', detail: 'experience / feedback / adoption', x: 76, y: 22 },
  { id: 'customer', label: 'CUSTOMER', detail: 'intent / support / retention', x: 78, y: 63 },
  { id: 'operations', label: 'OPERATIONS', detail: 'handoffs / approvals / workflows', x: 24, y: 69 },
  { id: 'data', label: 'DATA', detail: 'context / signals / decisions', x: 49, y: 49 },
  { id: 'people', label: 'PEOPLE', detail: 'judgment / ownership / execution', x: 50, y: 17 },
  { id: 'leadership', label: 'LEADERSHIP', detail: 'priorities / risk / outcomes', x: 52, y: 80 },
]

export const fragments = [
  { text: 'manual handoff', x: 30, y: 37 },
  { text: 'waiting', x: 63, y: 32 },
  { text: 'duplicate work', x: 37, y: 62 },
  { text: 'missed follow-up', x: 67, y: 54 },
  { text: 'spreadsheet', x: 52, y: 67 },
  { text: 'approval', x: 44, y: 30 },
]
