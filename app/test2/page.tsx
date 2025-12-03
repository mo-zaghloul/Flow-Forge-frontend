"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Page() {
  const [name, setName] = useState("");
  const [history, setHistory] = useState(false);
  const [output, setOutput] = useState("text");

  return (
    <div className="w-full flex justify-center pt-10">
      <div className="w-[450px] space-y-6">

        {/* Title */}
        <div>
          <h1 className="text-2xl font-semibold">Agent</h1>
          <p className="text-sm text-muted-foreground">
            Call the model with your instructions and tool
          </p>
        </div>

        {/* Name */}
        <div className="space-y-2">
          <Label>Name</Label>
          <Input
            placeholder="Agent"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Instructions */}
        <div className="space-y-2">
          <Label>Instructions</Label>
          <Textarea
            placeholder="Describe desired model behavior (tone, tool, usage, response style)"
            className="h-28"
          />
        </div>

        {/* Include chat history */}
        <div className="flex items-center justify-between">
          <Label>Include chat history</Label>
          <Switch checked={history} onCheckedChange={setHistory} />
        </div>

        {/* Output format */}
        <div className="space-y-2">
          <Label>Output format</Label>
          <Select value={output} onValueChange={setOutput}>
            <SelectTrigger>
              <SelectValue placeholder="Text" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text">Text</SelectItem>
              <SelectItem value="json">JSON</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tools */}
        <div className="space-y-3">
          <Label>Tools</Label>
          <Button variant="outline" className="w-full flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Tool
          </Button>
        </div>

      </div>
    </div>
  );
}
