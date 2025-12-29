# Object-Oriented Programming (OOP) Concepts in FlowForge

This document explains how the four main OOP concepts — **Inheritance**, **Polymorphism**, **Encapsulation**, and **Abstraction** — are implemented throughout our codebase.

---

## Table of Contents

1. [Inheritance](#1-inheritance)
2. [Polymorphism](#2-polymorphism)
3. [Encapsulation](#3-encapsulation)
4. [Abstraction](#4-abstraction)
5. [Summary Table](#5-summary-table)

---

## 1. Inheritance

**Definition:** Inheritance allows a class/component to inherit properties and behaviors from a parent class/interface, enabling code reuse and hierarchical relationships.

### 1.1 Interface Inheritance for Node Types

**File:** [components/types/node-config.tsx](../components/types/node-config.tsx)

```typescript
export interface FlowNodeData {
  id: string;
  label: string;
  type?: string;
  nodeType?: string;
  config?: NodeConfig;
  isStartNode?: boolean;
  isNewNode?: boolean;
  icon?: LucideIcon | string;
  bgColor?: string;
  baseColor?: string;
  iconColor?: string;
  onAddClick?: () => void;
  onAgentClick?: () => void;
  onUploadClick?: () => void;
  onOutputClick?: () => void;
  media_url?: string;
  agent_api_key?: string;
  prompt?: string;
}

export interface NodeTemplate {
  id: string;
  name: string;
  type: string;
  icon: LucideIcon | string;
  bgColor: string;
  baseColor?: string;
  iconColor: string;
  description?: string;
}
```

**Explanation:** 
- `FlowNodeData` serves as a **base interface** that all node components inherit from
- Both `BaseNode`, `StartNode`, `ExtractNode`, and `UploadMediaNode` extend this interface for their props
- This creates a consistent contract for all node types

### 1.2 Props Interface Extension

**File:** [components/flow/BaseNode.tsx](../components/flow/BaseNode.tsx)

```typescript
interface BaseNodeProps extends NodeProps<FlowNodeData> {
  data: FlowNodeData;
}
```

**File:** [components/flow/StartNode.tsx](../components/flow/StartNode.tsx)

```typescript
interface StartNodeProps extends NodeProps<FlowNodeData> {
  data: FlowNodeData & { onAddClick?: () => void };
}
```

**Explanation:**
- `BaseNodeProps` **extends** `NodeProps<FlowNodeData>` from ReactFlow library
- `StartNodeProps` extends `NodeProps` and **adds additional properties** using intersection types (`&`)
- This demonstrates TypeScript interface inheritance where child interfaces inherit and extend parent interfaces

### 1.3 Component Composition (Layout Inheritance Pattern)

**File:** [app/layout.tsx](../app/layout.tsx)

```typescript
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body>{children}</body>
      </ClerkProvider>
    </html>
  );
}
```

**File:** [app/(pages)/layout.tsx](../app/(pages)/layout.tsx)

```typescript
export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full h-screen">
      <Sidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
```

**Explanation:**
- `PagesLayout` **inherits** the structure from `RootLayout` (nested layouts in Next.js)
- Child layouts inherit parent layout's providers (ClerkProvider) and styling
- This represents a **layout inheritance hierarchy**

---

## 2. Polymorphism

**Definition:** Polymorphism allows objects of different types to be treated as objects of a common base type, enabling different behaviors based on the actual type.

### 2.1 Node Type Polymorphism

**File:** [components/flow/FlowCanvas.tsx](../components/flow/FlowCanvas.tsx)

```typescript
const nodeTypes = {
  custom: BaseNode,
};
```

**Explanation:**
- All different node types (`StartNode`, `ExtractNode`, `UploadMediaNode`) can be rendered through the same `BaseNode` component
- The `BaseNode` component **behaves differently** based on the `nodeType` property in data:

**File:** [components/flow/BaseNode.tsx](../components/flow/BaseNode.tsx)

```typescript
export default function BaseNode({ data }: BaseNodeProps) {
  const nodeType = nodeData.nodeType || nodeData.type || nodeData.id;
  const isStartNode = nodeType === "start" || nodeData.id === "start";
  const isEndNode = nodeType === "end" || nodeData.id === "end";

  // Different behavior based on node type
  {!isStartNode && (
    <Handle type="target" position={Position.Left} />
  )}
  {!isEndNode && (
    <Handle type="source" position={Position.Right} />
  )}
}
```

**Explanation:**
- The same `BaseNode` component renders **different handles** based on node type
- Start nodes only have source handles, end nodes only have target handles
- This is **runtime polymorphism** — same interface, different behavior

### 2.2 Button Click Handler Polymorphism

**File:** [components/flow/BaseNode.tsx](../components/flow/BaseNode.tsx)

```typescript
<button
  onClick={
    data.id === "agent" 
      ? data.onAgentClick 
      : (data.id === "upload")
      ? data.onUploadClick
      : (data.id === "output")
      ? data.onOutputClick
      : undefined
  }
>
```

**Explanation:**
- The same button element executes **different callback functions** based on node type
- `onAgentClick`, `onUploadClick`, `onOutputClick` are all function types but perform different actions
- This demonstrates **behavioral polymorphism**

### 2.3 Dialog Component Polymorphism

**Files:** 
- [components/dialogs/CreateAgentDialog.tsx](../components/dialogs/CreateAgentDialog.tsx)
- [components/dialogs/UploadMediaDialog.tsx](../components/dialogs/UploadMediaDialog.tsx)
- [components/dialogs/OutputNodeDialog.tsx](../components/dialogs/OutputNodeDialog.tsx)

```typescript
// All dialogs share the same interface pattern
interface CreateAgentDialogProps {
  open: boolean;
  onClose: () => void;
}

interface UploadMediaDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess?: (result: CloudinaryUploadResult) => void;
}

interface OutputNodeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialContent?: string;
  onSave?: (content: string) => void;
}
```

**Explanation:**
- All dialogs follow a **common interface pattern** (open state + onClose handler)
- Each dialog **implements different content and behavior**
- They can be used interchangeably in the FlowCanvas component

### 2.4 Button Variant Polymorphism

**File:** [components/ui/button.tsx](../components/ui/button.tsx)

```typescript
const buttonVariants = cva(
  "inline-flex items-center...",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground...",
        destructive: "bg-destructive text-white...",
        outline: "border bg-background...",
        secondary: "bg-secondary text-secondary-foreground...",
        ghost: "hover:bg-accent...",
        link: "text-primary underline-offset-4...",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md gap-1.5 px-3",
        lg: "h-10 rounded-md px-6",
        icon: "size-9",
      },
    },
  }
)
```

**Explanation:**
- Single `Button` component can render as **multiple different variants**
- Same component, different visual appearances based on `variant` and `size` props
- This is **parametric polymorphism** through variants

---

## 3. Encapsulation

**Definition:** Encapsulation bundles data and methods that operate on that data within a single unit, hiding internal implementation details.

### 3.1 Custom Hook Encapsulation

**File:** [hooks/useNodeConfig.tsx](../hooks/useNodeConfig.tsx)

```typescript
export function useNodeConfig() {
  // Private state - encapsulated within the hook
  const [configMap, setConfigMap] = useState<Record<string, NodeConfig>>({});

  // Public interface methods
  const initNodeConfig = (id: string, config: NodeConfig) => {
    setConfigMap((prev) => ({
      ...prev,
      [id]: { ...config },
    }));
  };

  const updateNodeConfig = (id: string, newConfig: NodeConfig) => {
    setConfigMap((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        ...newConfig,
      },
    }));
  };

  // Expose only the public interface
  return {
    configMap,
    initNodeConfig,
    updateNodeConfig,
  };
}
```

**Explanation:**
- `configMap` state is **private** to the hook
- Only `initNodeConfig` and `updateNodeConfig` are exposed as public methods
- Implementation details (useState, spread operators) are **hidden** from consumers
- Consumers can't directly modify `configMap` — they must use provided methods

### 3.2 API Layer Encapsulation

**File:** [lib/api/api.ts](../lib/api/api.ts)

```typescript
export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});
```

**File:** [lib/api/node-api.ts](../lib/api/node-api.ts)

```typescript
export const GetWorkflows = async () => {
  const response = await api.get<GetWorkflowsResponse>("/workflows");
  // Internal data transformation logic - encapsulated
  if (response.data && typeof response.data === 'object' && !Array.isArray(response.data)) {
    if (Array.isArray(response.data.workflows)) {
      return response.data.workflows;
    }
  }
  return response.data;
};

export const CreateWorkflow = async (createWorkflowRequest: CreateWorkflowRequest) => {
  const response = await api.post<CreateWorkflowResponse>("/workflows", createWorkflowRequest);
  return response.data;
};
```

**Explanation:**
- API configuration (`baseURL`, headers) is **encapsulated** in `api.ts`
- Response parsing and error handling is **hidden** within each function
- Components just call `GetWorkflows()` without knowing HTTP details
- **Separation of concerns** — API layer handles all network logic

### 3.3 Cloudinary Upload Encapsulation

**File:** [lib/api/cloudinary.ts](../lib/api/cloudinary.ts)

```typescript
export async function uploadToCloudinary(file: File): Promise<CloudinaryUploadResult> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  // All upload logic encapsulated
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
    { method: 'POST', body: formData }
  );

  return data as CloudinaryUploadResult;
}
```

**Explanation:**
- Environment variable access is **encapsulated**
- FormData construction is **hidden** from consumers
- Error handling is **internal** to the function
- Consumers just call `uploadToCloudinary(file)` — simple interface, complex internal logic

### 3.4 Component State Encapsulation

**File:** [components/dialogs/UploadMediaDialog.tsx](../components/dialogs/UploadMediaDialog.tsx)

```typescript
export default function UploadMediaDialog({ isOpen, onClose, onUploadSuccess }: UploadMediaDialogProps) {
  // Private internal state
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Internal helper functions
  const onDrop = useCallback((accepted: File[]) => {
    setFiles(accepted);
    setError(null);
  }, []);

  const handleUpload = async () => {
    // Complex upload logic encapsulated
    setIsUploading(true);
    try {
      const result = await uploadToCloudinary(files[0]);
      onUploadSuccess?.(result);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };
}
```

**Explanation:**
- `files`, `isUploading`, `error` states are **private** to the component
- Parent component only provides `isOpen`, `onClose`, `onUploadSuccess`
- Complex upload logic is **encapsulated** — parent doesn't know about loading states or error handling

---

## 4. Abstraction

**Definition:** Abstraction hides complex implementation details and exposes only essential features to the user.

### 4.1 Node Template Abstraction

**File:** [components/lib/node-config.tsx](../components/lib/node-config.tsx)

```typescript
export const availableNodes: NodeTemplate[] = [
  {
    id: "start",
    name: "Start",
    type: "",
    icon: Play,
    bgColor: "bg-[#7AF1A7]",
    iconColor: "text-black",
    description: "Start your workflow",
  },
  {
    id: "agent",
    name: "Agent",
    type: "agent",
    icon: MousePointer2,
    bgColor: "bg-[#0037FF9E]",
    iconColor: "text-black",
    description: "AI agent node",
  },
  // ... more nodes
];
```

**Explanation:**
- Complex node configuration is **abstracted** into simple template objects
- Users/developers don't need to know how nodes are rendered internally
- Just add a new object to `availableNodes` to create a new node type
- The **implementation complexity** of node rendering is hidden

### 4.2 Type Definitions as Abstraction

**File:** [components/types/node-config.tsx](../components/types/node-config.tsx)

```typescript
export type NodeConfig = {
  [key: string]: LucideIcon | string;
};

export interface FlowNodeData {
  id: string;
  label: string;
  type?: string;
  // ... abstracted properties
}

export interface NodeTemplate {
  id: string;
  name: string;
  type: string;
  // ... abstracted template
}
```

**Explanation:**
- Types **abstract** the expected data structure
- Developers work with `FlowNodeData` without knowing internal ReactFlow details
- Creates a **contract** that hides underlying library complexity

### 4.3 UI Component Abstraction (shadcn/ui)

**File:** [components/ui/dialog.tsx](../components/ui/dialog.tsx)

```typescript
function Dialog({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogContent({ className, children, showCloseButton = true, ...props }) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content className={cn("...", className)} {...props}>
        {children}
        {showCloseButton && <DialogPrimitive.Close>...</DialogPrimitive.Close>}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}
```

**Explanation:**
- Radix UI primitives are **abstracted** into simpler components
- Developers use `<Dialog>`, `<DialogContent>` without knowing Radix internals
- Portal, overlay, and close button logic are **hidden**
- This provides a **simplified API** for dialog creation

### 4.4 API Response Type Abstraction

**File:** [lib/api/node-api.ts](../lib/api/node-api.ts)

```typescript
export type GetWorkflowsResponse = {
  workflows_id: string;
  title: string;
  description: string;
  author: string;
}[];

export type GetWorkflowResponse = {
  title: string;
  author: string;
  nodes: {
    node_id: string;
    node_type: string;
    position: { x: number; y: number };
    next_node_id: string;
    data: {
      media_url: string;
      agent_api_key: string;
      prompt: string;
    };
  }[];
};
```

**Explanation:**
- API response structure is **abstracted** into TypeScript types
- Components work with typed data without knowing raw API response format
- **Decouples** frontend from backend implementation details

### 4.5 FlowCanvas Reference Abstraction

**File:** [components/flow/FlowCanvas.tsx](../components/flow/FlowCanvas.tsx)

```typescript
export interface FlowCanvasRef {
  getNodes: () => Node[];
  getEdges: () => Edge[];
}

const FlowCanvas = forwardRef<FlowCanvasRef, FlowCanvasProps>(
  ({ initialNodes }, ref) => {
    useImperativeHandle(ref, () => ({
      getNodes: () => nodes,
      getEdges: () => edges,
    }));
    // ... complex internal implementation
  }
);
```

**Explanation:**
- Parent components access FlowCanvas through a **simplified interface** (`getNodes`, `getEdges`)
- Internal ReactFlow state management is **hidden**
- Parents don't need to understand ReactFlow hooks to get node/edge data

---

## 5. Summary Table

| OOP Concept | Location | Example |
|-------------|----------|---------|
| **Inheritance** | [components/types/node-config.tsx](../components/types/node-config.tsx) | `FlowNodeData` interface extended by all node components |
| **Inheritance** | [components/flow/BaseNode.tsx](../components/flow/BaseNode.tsx) | `BaseNodeProps extends NodeProps<FlowNodeData>` |
| **Inheritance** | [app/(pages)/layout.tsx](../app/(pages)/layout.tsx) | Nested layouts inheriting from parent layout |
| **Polymorphism** | [components/flow/BaseNode.tsx](../components/flow/BaseNode.tsx) | Different node types rendered by same component |
| **Polymorphism** | [components/ui/button.tsx](../components/ui/button.tsx) | Button variants (default, destructive, outline, etc.) |
| **Polymorphism** | [components/dialogs/*](../components/dialogs/) | Multiple dialog types with common interface |
| **Encapsulation** | [hooks/useNodeConfig.tsx](../hooks/useNodeConfig.tsx) | Private state with public methods |
| **Encapsulation** | [lib/api/node-api.ts](../lib/api/node-api.ts) | API logic hidden from components |
| **Encapsulation** | [lib/api/cloudinary.ts](../lib/api/cloudinary.ts) | Upload complexity hidden in function |
| **Abstraction** | [components/lib/node-config.tsx](../components/lib/node-config.tsx) | Node templates abstract node configuration |
| **Abstraction** | [components/ui/dialog.tsx](../components/ui/dialog.tsx) | Radix UI primitives abstracted |
| **Abstraction** | [components/flow/FlowCanvas.tsx](../components/flow/FlowCanvas.tsx) | `FlowCanvasRef` abstracts internal state access |

---

## Conclusion

This FlowForge codebase demonstrates strong OOP principles adapted for React/TypeScript:

1. **Inheritance** is implemented through TypeScript interfaces and component composition
2. **Polymorphism** is achieved through variant-based components and type-based rendering logic
3. **Encapsulation** is enforced through custom hooks, private state, and API layer separation
4. **Abstraction** is provided through type definitions, template configurations, and UI component wrappers

These patterns make the codebase:
- **Maintainable** — Changes to one component don't affect others
- **Extensible** — New node types can be added easily
- **Testable** — Encapsulated units can be tested independently
- **Readable** — Abstract interfaces hide implementation complexity
