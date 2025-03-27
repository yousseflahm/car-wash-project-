<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\Models\Washer;

class WasherProfileUpdateRequest extends FormRequest
{
   

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(Washer::class)->ignore($this->user()->id),],
            'lastName' =>  ['required','string' ,' max:255' ],
            'phone' => ['required', 'string',  'regex:/^0[5-7]{1}[0-9]{8}$/'],
            'address' => ['required', 'string', 'max:255'],

        ];
    }
}
