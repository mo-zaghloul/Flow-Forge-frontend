"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ExampleDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* زر الفتح */}
      <DialogTrigger asChild>
        <Button 
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          Open Dialog
        </Button>
      </DialogTrigger>

      {/* المحتوى */}
      <DialogContent className="rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            عنوان الـ Dialog
          </DialogTitle>

          <DialogDescription className="text-gray-500">
            هنا تقدر تكتب وصف بسيط عن اللي هيحصل.
          </DialogDescription>
        </DialogHeader>

        {/* جسم الديالوج */}
        <div className="py-4">
          <p className="text-sm">
          </p>
        </div>

        {/* الفوتر */}
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          <Button
            className="bg-green-600 text-white hover:bg-green-700"
            onClick={() => alert("تم!")}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
