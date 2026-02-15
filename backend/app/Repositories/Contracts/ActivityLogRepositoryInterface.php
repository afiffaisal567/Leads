<?php

namespace App\Repositories\Contracts;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use App\Models\ActivityLog;

interface ActivityLogRepositoryInterface
{
    /**
     * Get all activity logs with pagination
     *
     * @param array $filters
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function getAllWithPagination(array $filters, int $perPage = 20): LengthAwarePaginator;

    /**
     * Create new activity log
     *
     * @param array $data
     * @return ActivityLog
     */
    public function create(array $data): ActivityLog;

    /**
     * Log admin activity
     *
     * @param int $userId
     * @param string $action
     * @param string $description
     * @param int|null $leadId
     * @param array|null $oldValues
     * @param array|null $newValues
     * @return ActivityLog
     */
    public function log(
        int $userId,
        string $action,
        string $description,
        ?int $leadId = null,
        ?array $oldValues = null,
        ?array $newValues = null
    ): ActivityLog;
}