<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLeadRequest;
use App\Http\Requests\UpdateLeadRequest;
use App\Http\Resources\LeadResource;
use App\Services\LeadService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LeadController extends Controller
{
    protected $leadService;

    public function __construct(LeadService $leadService)
    {
        $this->leadService = $leadService;
    }

    /**
     * Get all leads with pagination and search (Admin only)
     *
     * @param Request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $filters = [
            'search' => $request->input('search'),
            'order_by' => $request->input('order_by', 'created_at'),
            'order_direction' => $request->input('order_direction', 'desc'),
        ];

        $perPage = $request->input('per_page', 10);
        $leads = $this->leadService->getAllLeads($filters, $perPage);

        return response()->json([
            'success' => true,
            'message' => 'Leads retrieved successfully',
            'data' => LeadResource::collection($leads)->response()->getData(true),
        ], 200);
    }

    /**
     * Get single lead by ID (Admin only)
     *
     * @param int
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        $lead = $this->leadService->getLeadById($id);

        if (!$lead) {
            return response()->json([
                'success' => false,
                'message' => 'Lead not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Lead retrieved successfully',
            'data' => new LeadResource($lead),
        ], 200);
    }

    /**
     * Create new lead from public form (Landing page)
     *
     * @param StoreLeadRequest
     * @return JsonResponse
     */
    public function submitPublic(StoreLeadRequest $request): JsonResponse
    {
        $lead = $this->leadService->createLeadFromPublic($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Terima kasih! Data Anda telah berhasil dikirim. Tim kami akan segera menghubungi Anda.',
            'data' => new LeadResource($lead),
        ], 201);
    }

    /**
     * Create new lead (Admin only)
     *
     * @param StoreLeadRequest
     * @return JsonResponse
     */
    public function store(StoreLeadRequest $request): JsonResponse
    {
        $lead = $this->leadService->createLead($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Lead created successfully',
            'data' => new LeadResource($lead),
        ], 201);
    }

    /**
     * Update lead (Admin only)
     *
     * @param UpdateLeadRequest 
     * @param int
     * @return JsonResponse
     */
    public function update(UpdateLeadRequest $request, int $id): JsonResponse
    {
        $lead = $this->leadService->updateLead($id, $request->validated());

        if (!$lead) {
            return response()->json([
                'success' => false,
                'message' => 'Lead not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Lead updated successfully',
            'data' => new LeadResource($lead),
        ], 200);
    }

    /**
     * Delete lead (Admin only)
     *
     * @param int
     * @return JsonResponse
     */
    public function destroy(int $id): JsonResponse
    {
        $deleted = $this->leadService->deleteLead($id);

        if (!$deleted) {
            return response()->json([
                'success' => false,
                'message' => 'Lead not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Lead deleted successfully',
        ], 200);
    }
}