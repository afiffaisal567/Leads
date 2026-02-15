<?php

namespace App\Http\Controllers;

use App\Http\Resources\ActivityLogResource;
use App\Services\ActivityLogService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ActivityLogController extends Controller
{
    protected $activityLogService;

    public function __construct(ActivityLogService $activityLogService)
    {
        $this->activityLogService = $activityLogService;
    }

    /**
     * Get all activity logs with pagination (Admin only)
     *
     * @param Request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $filters = [
            'action' => $request->input('action'),
            'user_id' => $request->input('user_id'),
            'search' => $request->input('search'),
        ];

        $perPage = $request->input('per_page', 20);
        $logs = $this->activityLogService->getAllLogs($filters, $perPage);

        return response()->json([
            'success' => true,
            'message' => 'Activity logs retrieved successfully',
            'data' => ActivityLogResource::collection($logs)->response()->getData(true),
        ], 200);
    }
}