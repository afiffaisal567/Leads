<?php

namespace App\Services;

use App\Models\Lead;
use App\Repositories\Contracts\LeadRepositoryInterface;
use App\Repositories\Contracts\ActivityLogRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;

class LeadService
{
    protected $leadRepository;
    protected $activityLogRepository;

    public function __construct(
        LeadRepositoryInterface $leadRepository,
        ActivityLogRepositoryInterface $activityLogRepository
    ) {
        $this->leadRepository = $leadRepository;
        $this->activityLogRepository = $activityLogRepository;
    }

    /**
     * Get all leads with pagination
     *
     * @param array $filters
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function getAllLeads(array $filters, int $perPage = 10): LengthAwarePaginator
    {
        return $this->leadRepository->getAllWithPagination($filters, $perPage);
    }

    /**
     * Get lead by ID
     *
     * @param int $id
     * @return Lead|null
     */
    public function getLeadById(int $id): ?Lead
    {
        return $this->leadRepository->findById($id);
    }

    /**
     * Create new lead (from public form)
     *
     * @param array $data
     * @return Lead
     */
    public function createLeadFromPublic(array $data): Lead
    {
        return $this->leadRepository->create($data);
    }

    /**
     * Create new lead (from admin)
     *
     * @param array $data
     * @return Lead
     */
    public function createLead(array $data): Lead
    {
        $lead = $this->leadRepository->create($data);

        $user = Auth::guard('api')->user();
        if ($user) {
            $this->activityLogRepository->log(
                $user->id,
                'create_lead',
                "Admin {$user->name} melakukan create pada Leads ID #{$lead->id} pada " . now()->timezone('Asia/Jakarta')->format('d M Y H:i'),
                $lead->id,
                null,
                $lead->toArray()
            );
        }

        return $lead;
    }

    /**
     * Update lead
     *
     * @param int $id
     * @param array $data
     * @return Lead|null
     */
    public function updateLead(int $id, array $data): ?Lead
    {
        $oldLead = $this->leadRepository->findById($id);
        if (!$oldLead) {
            return null;
        }

        $oldValues = $oldLead->toArray();
        $lead = $this->leadRepository->update($id, $data);

        if ($lead) {
            $user = Auth::guard('api')->user();
            if ($user) {
                $this->activityLogRepository->log(
                    $user->id,
                    'update_lead',
                    "Admin {$user->name} melakukan update pada Leads ID #{$lead->id} pada " . now()->timezone('Asia/Jakarta')->format('d M Y H:i'),
                    $lead->id,
                    $oldValues,
                    $lead->toArray()
                );
            }
        }

        return $lead;
    }

    /**
     * Delete lead
     *
     * @param int $id
     * @return bool
     */
    public function deleteLead(int $id): bool
    {
        $lead = $this->leadRepository->findById($id);
        if (!$lead) {
            return false;
        }

        $leadData = $lead->toArray();
        $deleted = $this->leadRepository->delete($id);

        if ($deleted) {
            $user = Auth::guard('api')->user();
            if ($user) {
                $this->activityLogRepository->log(
                    $user->id,
                    'delete_lead',
                    "Admin {$user->name} melakukan delete pada Leads ID #{$id} pada " . now()->timezone('Asia/Jakarta')->format('d M Y H:i'),
                    null,
                    $leadData,
                    null
                );
            }
        }

        return $deleted;
    }

    /**
     * Check if email exists
     *
     * @param string $email
     * @param int|null $excludeId
     * @return bool
     */
    public function emailExists(string $email, ?int $excludeId = null): bool
    {
        return $this->leadRepository->emailExists($email, $excludeId);
    }
}