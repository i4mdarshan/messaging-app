<?php

namespace App\Http\Requests;

use App\Traits\BaseApiResponse;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreMessagesRequest extends FormRequest
{
    use BaseApiResponse; // Use it here directly
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'message' => 'nullable|string',
            'groups_id' => 'required_without:receiver_id|nullable|exists:groups,id',
            'receiver_id' => 'required_without:groups_id|nullable|exists:users,id',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            $this->validationErrorResponse("Error while validating data", 422, $validator->errors()->getMessages())
        );
    }
}
