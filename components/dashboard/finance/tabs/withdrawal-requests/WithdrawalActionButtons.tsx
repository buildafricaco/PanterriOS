"use client";

import { Button } from "@/components/ui/button";
import { CircleCheckBig, CircleX } from "lucide-react";
import { toast } from "sonner";
import { SlideInPanelDrawer } from "@/components/shared";
import { WithdrawalRequestDetails } from "./WithdrawalRequestDetails";
import { useWithdrawalActions } from "@/hook/wallet-finance/useWithdrawalActions";
import { WithdrawalRequestItem } from "@/interface";
import { Spinner } from "@/components/ui/spinner";

export const WithdrawalActionButtons = ({
  row,
}: {
  row: WithdrawalRequestItem;
}) => {
  const status = row.statusLabel?.trim().toLowerCase();
  const id = row.requestId;
  const { withdrawalAction, isPending, variables } = useWithdrawalActions();
  const isApproving =
    isPending &&
    variables?.requestId === id &&
    variables?.params?.decision === "approve";
  const isRejecting =
    isPending &&
    variables?.requestId === id &&
    variables?.params?.decision === "reject";

  const handleApproveWithdrawal = async () => {
    try {
      await withdrawalAction({
        requestId: id,
        params: {
          decision: "approve",
          adminNote: "Approved by admin via dashboard",
        },
      });
      toast.success("Withdrawal approved successfully");
    } catch (error) {
      console.error(error);
    }
  };

  const handleRejectWithdrawal = async () => {
    try {
      await withdrawalAction({
        requestId: id,
        params: {
          decision: "reject",
          adminNote: "Rejected by admin via dashboard",
        },
      });
      toast.success("Withdrawal rejected successfully");
    } catch (error) {
      console.error(error);
    }
  };

  // Pending
  if (status === "pending") {
    return (
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          onClick={handleApproveWithdrawal}
          disabled={isApproving}
          className="bg-green-600 rounded-sm w-full flex-1 font-normal hover:bg-green-700 text-white  disabled:cursor-not-allowed"
        >
          {isApproving ? (
            <Spinner />
          ) : (
            <>
              <CircleCheckBig className="h-4 w-4 mr-0.5" /> Approve
            </>
          )}
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={handleRejectWithdrawal}
          disabled={isRejecting}
          className="rounded-sm font-normal w-full flex-1  disabled:cursor-not-allowed"
        >
          {isRejecting ? (
            <Spinner />
          ) : (
            <>
              <CircleX className="h-4 w-4 mr-0.5" />
              Reject
            </>
          )}
        </Button>
      </div>
    );
  }

  // Processing
  if (status === "processing") {
    return (
      <div className="flex items-center gap-2">
        <SlideInPanelDrawer
          trigger={
            <Button
              size="sm"
              variant="outline"
              className="bg-[#00A63E] border-[#00A63E] cursor-pointer rounded-sm font-normal text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CircleCheckBig className="h-4 w-4 mr-0.5 hover:text-gray-600 text-white" />{" "}
              Check Status
            </Button>
          }
          title="Withdrawal Detail Center"
          subtitle="Manage Withdrawal Request Details"
          width="md"
          contentClassName={"mx-0"}
        >
          <WithdrawalRequestDetails requestId={id} />
        </SlideInPanelDrawer>

        <Button
          size="sm"
          variant="outline"
          disabled
          className="rounded-sm font-normal border-[#A9A8A8] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <CircleX className="h-4 w-4 mr-0.5" />
          Reject
        </Button>
      </div>
    );
  }

  // Approved or Paid
  return (
    <div className="flex items-center gap-2">
      <SlideInPanelDrawer
        trigger={
          <Button
            size="sm"
            variant="outline"
            className="bg-[#00A63E] border-[#00A63E] cursor-pointer rounded-sm font-normal text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CircleCheckBig className="h-4 w-4 mr-0.5 hover:text-gray-600 text-white" />{" "}
            View
          </Button>
        }
        title="Withdrawal Detail Center"
        subtitle="Manage Withdrawal Request Details"
        width="md"
        contentClassName={"mx-0"}
      >
        <WithdrawalRequestDetails requestId={id} />
      </SlideInPanelDrawer>
      <Button
        size="sm"
        variant="outline"
        disabled
        className="rounded-sm font-normal cursor-not-allowed border-[#A9A8A8] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <CircleX className="h-4 w-4 mr-0.5" />
        Reject
      </Button>
    </div>
  );
};
