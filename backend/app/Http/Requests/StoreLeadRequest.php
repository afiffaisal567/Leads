<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreLeadRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Public endpoint
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nama' => ['required', 'string', 'max:255'],
            'nomor_whatsapp' => ['required', 'string', 'regex:/^(\+62|62|0)[0-9]{9,12}$/', 'max:20'],
            'email' => ['required', 'email', 'max:255', 'unique:leads,email'],
            'nama_lembaga' => ['required', 'string', 'max:255'],
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'nama.required' => 'Nama wajib diisi',
            'nama.string' => 'Nama harus berupa teks',
            'nama.max' => 'Nama maksimal 255 karakter',
            
            'nomor_whatsapp.required' => 'Nomor WhatsApp wajib diisi',
            'nomor_whatsapp.string' => 'Nomor WhatsApp harus berupa teks',
            'nomor_whatsapp.regex' => 'Format nomor WhatsApp tidak valid (contoh: 081234567890)',
            'nomor_whatsapp.max' => 'Nomor WhatsApp maksimal 20 karakter',
            
            'email.required' => 'Email wajib diisi',
            'email.email' => 'Format email tidak valid',
            'email.max' => 'Email maksimal 255 karakter',
            'email.unique' => 'Email sudah terdaftar',
            
            'nama_lembaga.required' => 'Nama lembaga wajib diisi',
            'nama_lembaga.string' => 'Nama lembaga harus berupa teks',
            'nama_lembaga.max' => 'Nama lembaga maksimal 255 karakter',
        ];
    }

    /**
     * Handle a failed validation attempt.
     *
     * @param  \Illuminate\Contracts\Validation\Validator  $validator
     * @return void
     *
     * @throws \Illuminate\Http\Exceptions\HttpResponseException
     */
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422)
        );
    }
}