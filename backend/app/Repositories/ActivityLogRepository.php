<?php

namespace App\Repositories;

use App\Models\ActivityLog;
use App\Repositories\Contracts\ActivityLogRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Request;

class ActivityLogRepository implements ActivityLogRepositoryInterface
{
    /**
     * Get all activity logs with pagination
     *
     * @param array $filters
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function getAllWithPagination(array $filters, int $perPage = 20): LengthAwarePaginator
    {
        $query = ActivityLog::with(['user:id,name,email', 'lead:id,nama,email']);

        if (isset($filters['action']) && !empty($filters['action'])) {
            $query->byAction($filters['action']);
        }

        if (isset($filters['user_id']) && !empty($filters['user_id'])) {
            $query->byUser($filters['user_id']);
        }

        if (isset($filters['search']) && !empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('description', 'like', "%{$search}%")
                  ->orWhereHas('user', function ($uq) use ($search) {
                      $uq->where('name', 'like', "%{$search}%");
                  });
            });
        }

        $query->orderBy('created_at', 'desc');

        return $query->paginate($perPage);
    }

    /**
     * Create new activity log
     *
     * @param array $data
     * @return ActivityLog
     */
    public function create(array $data): ActivityLog
    {
        // Auto-add IP and User Agent if not provided
        if (!isset($data['ip_address'])) {
            $data['ip_address'] = Request::ip();
        }

        if (!isset($data['user_agent'])) {
            $data['user_agent'] = Request::userAgent();
        }

        return ActivityLog::create($data);
    }

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
    ): ActivityLog {
        return $this->create([
            'user_id' => $userId,
            'action' => $action,
            'description' => $description,
            'lead_id' => $leadId,
            'old_values' => $oldValues,
            'new_values' => $newValues,
        ]);
    }
}