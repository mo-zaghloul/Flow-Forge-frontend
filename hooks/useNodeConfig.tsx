"use client";

import { useState } from "react";
import type { NodeConfig } from "../components/types/node-config";

export function useNodeConfig() {
  const [configMap, setConfigMap] = useState<Record<string, NodeConfig>>({});

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

  return {
    configMap,
    initNodeConfig,
    updateNodeConfig,
  };
}
