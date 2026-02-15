<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActivityLog extends Model
{
    use HasFactory;

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'action',
        'description',
        'lead_id',
        'ip_address',
        'user_agent',
        'old_values',
        'new_values',
        'created_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'old_values' => 'array',
        'new_values' => 'array',
        'created_at' => 'datetime',
    ];

    /**
     * User relationship
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Lead relationship
     */
    public function lead()
    {
        return $this->belongsTo(Lead::class);
    }

    /**
     * Boot method to auto-set created_at
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (!$model->created_at) {
                $model->created_at = now();
            }
        });
    }

    /**
     * Scope untuk filter by action
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string|null $action
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByAction($query, $action)
    {
        if ($action) {
            return $query->where('action', $action);
        }

        return $query;
    }

    /**
     * Scope untuk filter by user
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param int|null $userId
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByUser($query, $userId)
    {
        if ($userId) {
            return $query->where('user_id', $userId);
        }

        return $query;
    }
}