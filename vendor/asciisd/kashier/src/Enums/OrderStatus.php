<?php

namespace Asciisd\Kashier\Enums;

enum OrderStatus: string
{
    case Captured = 'CAPTURED';
    case Success = 'SUCCESS';
    case Initiated = 'INITIATED';
    case Declined = 'DECLINED';
    case Failure = 'FAILURE';
    case Refunded = 'REFUNDED';
    case Cancelled = 'CANCELLED';

    public function description(): string
    {
        return match ($this) {
            self::Initiated => __('Order is initiated'),
            self::Captured => __('Order is captured'),
            self::Declined => __('Order is declined'),
            self::Failure => __('Order is failed'),
            self::Success => __('Order is successful'),
            self::Refunded => __('Order is refunded'),
            self::Cancelled => __('Order is cancelled'),
        };
    }

    public function displayName(): string
    {
        return match ($this) {
            self::Initiated => 'Initiated',
            self::Captured => 'Captured',
            self::Declined => 'Declined',
            self::Failure => 'Failure',
            self::Success => 'Success',
            self::Refunded => 'Refunded',
            self::Cancelled => 'Cancelled',
        };
    }

    public function styleColor(): string
    {
        return match ($this) {
            self::Captured, self::Success => 'success-status',
            self::Initiated => 'info-status',
            self::Declined, self::Refunded, self::Failure, self::Cancelled => 'danger-status',
        };
    }

    public function textColor(): string
    {
        return match ($this) {
            self::Captured, self::Success => 'successText',
            self::Initiated => 'infoText',
            self::Declined, self::Refunded, self::Failure, self::Cancelled => 'dangerText',
        };
    }

    public function bgColor(): string
    {
        return match ($this) {
            self::Captured, self::Success => 'successBG',
            self::Initiated => 'infoBG',
            self::Declined, self::Refunded, self::Failure, self::Cancelled => 'dangerBG',
        };
    }

    public static function successStates(): array
    {
        return array_column([
            self::Captured, self::Success,
        ], 'name');
    }

    public static function successStatesValues(): array
    {
        return array_column([
            self::Captured, self::Success,
        ], 'value');
    }

    public static function failedStates(): array
    {
        return array_column([
            self::Declined, self::Refunded, self::Failure, self::Cancelled
        ], 'name');
    }

    public static function loadingStates(): array
    {
        return array_column([
            self::Initiated
        ], 'name');
    }

    public function isSuccess(): bool
    {
        return in_array($this->name, self::successStates());
    }

    public function isPending(): bool
    {
        return in_array($this->name, self::loadingStates());
    }

    public function isFailed(): bool
    {
        return in_array($this->name, self::failedStates());
    }

    public function isRefunded(): bool
    {
        return $this->value == self::Refunded;
    }

    public function toFullArray(): array
    {
        return [
            'id' => $this->value,
            'name' => $this->displayName(),
            'description' => $this->description(),
            'style' => $this->styleColor(),
            'text_color' => $this->textColor(),
            'bg_color' => $this->bgColor(),
        ];
    }
}
