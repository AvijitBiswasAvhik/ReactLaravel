<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class EnumValueRule implements Rule
{
    private $validValues;

    public function __construct(array $validValues)
    {
        $this->validValues = $validValues;
    }

    public function passes($attribute, $value)
    {
        return in_array($value, $this->validValues);
    }

    public function message()
    {
        return 'The :attribute must be a valid enum value.';
    }
}
