import React,{useState} from "react";
import { Eye, Pencil, Copy, Trash2 } from "lucide-react";

interface AlgoTableProps {
  onIconClick: (mode: "view" | "edit" | "copy" | "delete") => void;
}

export const AlgoTable = ({ onIconClick }: AlgoTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-4/5 divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Alert</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Client ID</th>
            <th className="px-4 py-2">Algo</th>
            <th className="px-4 py-2">Tags</th>
            <th className="px-4 py-2">MTM</th>
            <th className="px-4 py-2">Time</th>
            <th className="px-4 py-2">Signal</th>
            <th className="px-4 py-2">Multiplier</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {[...Array(8)].map((_, i) => (
            <tr key={i} className="text-center text-sm">
              <td className="px-4 py-2">{i + 1}</td>
              <td className="px-4 py-2">
                <input type="checkbox" className="form-checkbox" />
              </td>
              <td className="px-4 py-2 text-green-500">↑ Active</td>
              <td className="px-4 py-2">9902020-IFL</td>
              <td className="px-4 py-2">Bear Put Spread</td>
              <td className="px-4 py-2">
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs mr-1">Intraday</span>
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs mr-1">Label</span>
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">N</span>
              </td>
              <td className="px-4 py-2 text-red-500">₹0</td>
              <td className="px-4 py-2">09:15 - 15:15</td>
              <td className="px-4 py-2 text-blue-600">BUY/SELL</td>
              <td className="px-4 py-2">1x</td>
              <td className="px-4 py-2 flex justify-center items-center gap-2">
                <Eye className="w-4 h-4 text-gray-600 hover:text-black cursor-pointer" onClick={() => onIconClick("view")} />
                <Pencil className="w-4 h-4 text-gray-600 hover:text-black cursor-pointer" onClick={() => onIconClick("edit")} />
                <Copy className="w-4 h-4 text-gray-600 hover:text-black cursor-pointer" onClick={() => onIconClick("copy")} />
                <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700 cursor-pointer" onClick={() => onIconClick("delete")} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

