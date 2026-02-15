<?php

namespace App\Repositories;

use App\Models\Lead;
use App\Repositories\Contracts\LeadRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class LeadRepository implements LeadRepositoryInterface
{
    /**
     * Get all leads with pagination and search
     *
     * @param array $filters
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function getAllWithPagination(array $filters, int $perPage = 10): LengthAwarePaginator
    {
        $query = Lead::query();

        if (isset($filters['search']) && !empty($filters['search'])) {
            $query->search($filters['search']);
        }
        $orderBy = $filters['order_by'] ?? 'created_at';
        $orderDirection = $filters['order_direction'] ?? 'desc';
        $query->orderByColumn($orderBy, $orderDirection);

        return $query->paginate($perPage);
    }

    /**
     * Find lead by ID
     *
     * @param int $id
     * @return Lead|null
     */
    public function findById(int $id): ?Lead
    {
        return Lead::find($id);
    }

    /**
     * Create new lead
     *
     * @param array $data
     * @return Lead
     */
    public function create(array $data): Lead
    {
        return Lead::create($data);
    }

    /**
     * Update lead
     *
     * @param int $id
     * @param array $data
     * @return Lead|null
     */
    public function update(int $id, array $data): ?Lead
    {
        $lead = $this->findById($id);
        
        if ($lead) {
            $lead->update($data);
            return $lead->fresh();
        }

        return null;
    }

    /**
     * Delete lead
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool
    {
        $lead = $this->findById($id);
        
        if ($lead) {
            return $lead->delete();
        }

        return false;
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
        $query = Lead::where('email', $email);

        if ($excludeId) {
            $query->where('id', '!=', $excludeId);
        }

        return $query->exists();
    }
}