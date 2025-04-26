<?php

namespace App\Traits;

trait BaseApiResponse
{
    protected function successResponse($message = 'Success', $status = 200, $data = [])
    {
        return response()->json([
            'success' => true,
            'data' => $data,
            'status' => $status,
            'message' => $message,
        ], $status);
    }

    protected function errorResponse($message = 'Something went wrong', $status = 500, $errors = [])
    {
        return response()->json([
            'success' => false,
            'data' => [],
            'status' => $status,
            'message' => $message,
            'errors' => $errors,
        ], $status);
    }

    protected function validationErrorResponse($message = 'Validation failed', $status = 422, $errors = [])
    {
        return response()->json([
            'success' => false,
            'data' => [],
            'status' => $status,
            'message' => $message,
            'errors' => $errors,
        ], $status);
    }

    protected function paginatedResponse($message = 'Success', $status = 200, $resource)
    {

        return response()->json([
            'success' => true,
            'data' => $resource->items(),
            'meta' => [
                'current_page' => $resource->currentPage(),
                'last_page' => $resource->lastPage(),
                'per_page' => $resource->perPage(),
                'total' => $resource->total(),
            ],
            'status' => $status,
            'message' => $message,
        ], $status);
    }
}
