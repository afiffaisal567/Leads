<?php

namespace App\Repositories\Contracts;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use App\Models\Lead;

interface LeadRepositoryInterface
{
    /**
     * Get all leads with pagination and search
     *
     * @param array $filters
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function getAllWithPagination(array $filters, int $perPage = 10): LengthAwarePaginator;

    /**
     * Find lead by ID
     *
     * @param int $id
     * @return Lead|null
     */
    public function findById(int $id): ?Lead;

    /**
     * Create new lead
     *
     * @param array $data
     * @return Lead
     */
    public function create(array $data): Lead;

    /**
     * Update lead
     *
     * @param int $id
     * @param array $data
     * @return Lead|null
     */
    public function update(int $id, array $data): ?Lead;

    /**
     * Delete lead
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool;

    /**
     * Check if email exists
     *
     * @param string $email
     * @param int|null $excludeId
     * @return bool
     */
    public function emailExists(string $email, ?int $excludeId = null): bool;
}