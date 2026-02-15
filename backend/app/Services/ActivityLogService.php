<?php

namespace App\Services;

use App\Repositories\Contracts\ActivityLogRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ActivityLogService
{
    protected $activityLogRepository;

    public function __construct(ActivityLogRepositoryInterface $activityLogRepository)
    {
        $this->activityLogRepository = $activityLogRepository;
    }

    /**
     * Get all activity logs with pagination
     *
     * @param array $filters
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function getAllLogs(array $filters, int $perPage = 20): LengthAwarePaginator
    {
        return $this->activityLogRepository->getAllWithPagination($filters, $perPage);
    }
}