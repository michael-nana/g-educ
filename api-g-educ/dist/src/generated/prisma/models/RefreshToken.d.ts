import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type RefreshTokenModel = runtime.Types.Result.DefaultSelection<Prisma.$RefreshTokenPayload>;
export type AggregateRefreshToken = {
    _count: RefreshTokenCountAggregateOutputType | null;
    _min: RefreshTokenMinAggregateOutputType | null;
    _max: RefreshTokenMaxAggregateOutputType | null;
};
export type RefreshTokenMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    tokenHash: string | null;
    deviceId: string | null;
    deviceName: string | null;
    expiresAt: Date | null;
    revokedAt: Date | null;
    replacedById: string | null;
    lastUsedAt: Date | null;
    createdAt: Date | null;
};
export type RefreshTokenMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    tokenHash: string | null;
    deviceId: string | null;
    deviceName: string | null;
    expiresAt: Date | null;
    revokedAt: Date | null;
    replacedById: string | null;
    lastUsedAt: Date | null;
    createdAt: Date | null;
};
export type RefreshTokenCountAggregateOutputType = {
    id: number;
    userId: number;
    tokenHash: number;
    deviceId: number;
    deviceName: number;
    expiresAt: number;
    revokedAt: number;
    replacedById: number;
    lastUsedAt: number;
    createdAt: number;
    _all: number;
};
export type RefreshTokenMinAggregateInputType = {
    id?: true;
    userId?: true;
    tokenHash?: true;
    deviceId?: true;
    deviceName?: true;
    expiresAt?: true;
    revokedAt?: true;
    replacedById?: true;
    lastUsedAt?: true;
    createdAt?: true;
};
export type RefreshTokenMaxAggregateInputType = {
    id?: true;
    userId?: true;
    tokenHash?: true;
    deviceId?: true;
    deviceName?: true;
    expiresAt?: true;
    revokedAt?: true;
    replacedById?: true;
    lastUsedAt?: true;
    createdAt?: true;
};
export type RefreshTokenCountAggregateInputType = {
    id?: true;
    userId?: true;
    tokenHash?: true;
    deviceId?: true;
    deviceName?: true;
    expiresAt?: true;
    revokedAt?: true;
    replacedById?: true;
    lastUsedAt?: true;
    createdAt?: true;
    _all?: true;
};
export type RefreshTokenAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RefreshTokenWhereInput;
    orderBy?: Prisma.RefreshTokenOrderByWithRelationInput | Prisma.RefreshTokenOrderByWithRelationInput[];
    cursor?: Prisma.RefreshTokenWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | RefreshTokenCountAggregateInputType;
    _min?: RefreshTokenMinAggregateInputType;
    _max?: RefreshTokenMaxAggregateInputType;
};
export type GetRefreshTokenAggregateType<T extends RefreshTokenAggregateArgs> = {
    [P in keyof T & keyof AggregateRefreshToken]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateRefreshToken[P]> : Prisma.GetScalarType<T[P], AggregateRefreshToken[P]>;
};
export type RefreshTokenGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RefreshTokenWhereInput;
    orderBy?: Prisma.RefreshTokenOrderByWithAggregationInput | Prisma.RefreshTokenOrderByWithAggregationInput[];
    by: Prisma.RefreshTokenScalarFieldEnum[] | Prisma.RefreshTokenScalarFieldEnum;
    having?: Prisma.RefreshTokenScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: RefreshTokenCountAggregateInputType | true;
    _min?: RefreshTokenMinAggregateInputType;
    _max?: RefreshTokenMaxAggregateInputType;
};
export type RefreshTokenGroupByOutputType = {
    id: string;
    userId: string;
    tokenHash: string;
    deviceId: string;
    deviceName: string | null;
    expiresAt: Date;
    revokedAt: Date | null;
    replacedById: string | null;
    lastUsedAt: Date | null;
    createdAt: Date;
    _count: RefreshTokenCountAggregateOutputType | null;
    _min: RefreshTokenMinAggregateOutputType | null;
    _max: RefreshTokenMaxAggregateOutputType | null;
};
export type GetRefreshTokenGroupByPayload<T extends RefreshTokenGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<RefreshTokenGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof RefreshTokenGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], RefreshTokenGroupByOutputType[P]> : Prisma.GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>;
}>>;
export type RefreshTokenWhereInput = {
    AND?: Prisma.RefreshTokenWhereInput | Prisma.RefreshTokenWhereInput[];
    OR?: Prisma.RefreshTokenWhereInput[];
    NOT?: Prisma.RefreshTokenWhereInput | Prisma.RefreshTokenWhereInput[];
    id?: Prisma.UuidFilter<"RefreshToken"> | string;
    userId?: Prisma.UuidFilter<"RefreshToken"> | string;
    tokenHash?: Prisma.StringFilter<"RefreshToken"> | string;
    deviceId?: Prisma.StringFilter<"RefreshToken"> | string;
    deviceName?: Prisma.StringNullableFilter<"RefreshToken"> | string | null;
    expiresAt?: Prisma.DateTimeFilter<"RefreshToken"> | Date | string;
    revokedAt?: Prisma.DateTimeNullableFilter<"RefreshToken"> | Date | string | null;
    replacedById?: Prisma.UuidNullableFilter<"RefreshToken"> | string | null;
    lastUsedAt?: Prisma.DateTimeNullableFilter<"RefreshToken"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"RefreshToken"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    replacedBy?: Prisma.XOR<Prisma.RefreshTokenNullableScalarRelationFilter, Prisma.RefreshTokenWhereInput> | null;
    replaces?: Prisma.XOR<Prisma.RefreshTokenNullableScalarRelationFilter, Prisma.RefreshTokenWhereInput> | null;
};
export type RefreshTokenOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    tokenHash?: Prisma.SortOrder;
    deviceId?: Prisma.SortOrder;
    deviceName?: Prisma.SortOrderInput | Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    revokedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    replacedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastUsedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    replacedBy?: Prisma.RefreshTokenOrderByWithRelationInput;
    replaces?: Prisma.RefreshTokenOrderByWithRelationInput;
};
export type RefreshTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    tokenHash?: string;
    replacedById?: string;
    AND?: Prisma.RefreshTokenWhereInput | Prisma.RefreshTokenWhereInput[];
    OR?: Prisma.RefreshTokenWhereInput[];
    NOT?: Prisma.RefreshTokenWhereInput | Prisma.RefreshTokenWhereInput[];
    userId?: Prisma.UuidFilter<"RefreshToken"> | string;
    deviceId?: Prisma.StringFilter<"RefreshToken"> | string;
    deviceName?: Prisma.StringNullableFilter<"RefreshToken"> | string | null;
    expiresAt?: Prisma.DateTimeFilter<"RefreshToken"> | Date | string;
    revokedAt?: Prisma.DateTimeNullableFilter<"RefreshToken"> | Date | string | null;
    lastUsedAt?: Prisma.DateTimeNullableFilter<"RefreshToken"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"RefreshToken"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    replacedBy?: Prisma.XOR<Prisma.RefreshTokenNullableScalarRelationFilter, Prisma.RefreshTokenWhereInput> | null;
    replaces?: Prisma.XOR<Prisma.RefreshTokenNullableScalarRelationFilter, Prisma.RefreshTokenWhereInput> | null;
}, "id" | "tokenHash" | "replacedById">;
export type RefreshTokenOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    tokenHash?: Prisma.SortOrder;
    deviceId?: Prisma.SortOrder;
    deviceName?: Prisma.SortOrderInput | Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    revokedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    replacedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    lastUsedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.RefreshTokenCountOrderByAggregateInput;
    _max?: Prisma.RefreshTokenMaxOrderByAggregateInput;
    _min?: Prisma.RefreshTokenMinOrderByAggregateInput;
};
export type RefreshTokenScalarWhereWithAggregatesInput = {
    AND?: Prisma.RefreshTokenScalarWhereWithAggregatesInput | Prisma.RefreshTokenScalarWhereWithAggregatesInput[];
    OR?: Prisma.RefreshTokenScalarWhereWithAggregatesInput[];
    NOT?: Prisma.RefreshTokenScalarWhereWithAggregatesInput | Prisma.RefreshTokenScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"RefreshToken"> | string;
    userId?: Prisma.UuidWithAggregatesFilter<"RefreshToken"> | string;
    tokenHash?: Prisma.StringWithAggregatesFilter<"RefreshToken"> | string;
    deviceId?: Prisma.StringWithAggregatesFilter<"RefreshToken"> | string;
    deviceName?: Prisma.StringNullableWithAggregatesFilter<"RefreshToken"> | string | null;
    expiresAt?: Prisma.DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string;
    revokedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"RefreshToken"> | Date | string | null;
    replacedById?: Prisma.UuidNullableWithAggregatesFilter<"RefreshToken"> | string | null;
    lastUsedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"RefreshToken"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string;
};
export type RefreshTokenCreateInput = {
    id?: string;
    tokenHash: string;
    deviceId: string;
    deviceName?: string | null;
    expiresAt: Date | string;
    revokedAt?: Date | string | null;
    lastUsedAt?: Date | string | null;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutRefreshTokensInput;
    replacedBy?: Prisma.RefreshTokenCreateNestedOneWithoutReplacesInput;
    replaces?: Prisma.RefreshTokenCreateNestedOneWithoutReplacedByInput;
};
export type RefreshTokenUncheckedCreateInput = {
    id?: string;
    userId: string;
    tokenHash: string;
    deviceId: string;
    deviceName?: string | null;
    expiresAt: Date | string;
    revokedAt?: Date | string | null;
    replacedById?: string | null;
    lastUsedAt?: Date | string | null;
    createdAt?: Date | string;
    replaces?: Prisma.RefreshTokenUncheckedCreateNestedOneWithoutReplacedByInput;
};
export type RefreshTokenUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    deviceId?: Prisma.StringFieldUpdateOperationsInput | string;
    deviceName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    revokedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastUsedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutRefreshTokensNestedInput;
    replacedBy?: Prisma.RefreshTokenUpdateOneWithoutReplacesNestedInput;
    replaces?: Prisma.RefreshTokenUpdateOneWithoutReplacedByNestedInput;
};
export type RefreshTokenUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    deviceId?: Prisma.StringFieldUpdateOperationsInput | string;
    deviceName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    revokedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    replacedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastUsedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    replaces?: Prisma.RefreshTokenUncheckedUpdateOneWithoutReplacedByNestedInput;
};
export type RefreshTokenCreateManyInput = {
    id?: string;
    userId: string;
    tokenHash: string;
    deviceId: string;
    deviceName?: string | null;
    expiresAt: Date | string;
    revokedAt?: Date | string | null;
    replacedById?: string | null;
    lastUsedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type RefreshTokenUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    deviceId?: Prisma.StringFieldUpdateOperationsInput | string;
    deviceName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    revokedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastUsedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RefreshTokenUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    deviceId?: Prisma.StringFieldUpdateOperationsInput | string;
    deviceName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    revokedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    replacedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastUsedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RefreshTokenListRelationFilter = {
    every?: Prisma.RefreshTokenWhereInput;
    some?: Prisma.RefreshTokenWhereInput;
    none?: Prisma.RefreshTokenWhereInput;
};
export type RefreshTokenOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type RefreshTokenNullableScalarRelationFilter = {
    is?: Prisma.RefreshTokenWhereInput | null;
    isNot?: Prisma.RefreshTokenWhereInput | null;
};
export type RefreshTokenCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    tokenHash?: Prisma.SortOrder;
    deviceId?: Prisma.SortOrder;
    deviceName?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    revokedAt?: Prisma.SortOrder;
    replacedById?: Prisma.SortOrder;
    lastUsedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type RefreshTokenMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    tokenHash?: Prisma.SortOrder;
    deviceId?: Prisma.SortOrder;
    deviceName?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    revokedAt?: Prisma.SortOrder;
    replacedById?: Prisma.SortOrder;
    lastUsedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type RefreshTokenMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    tokenHash?: Prisma.SortOrder;
    deviceId?: Prisma.SortOrder;
    deviceName?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
    revokedAt?: Prisma.SortOrder;
    replacedById?: Prisma.SortOrder;
    lastUsedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type RefreshTokenCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.RefreshTokenCreateWithoutUserInput, Prisma.RefreshTokenUncheckedCreateWithoutUserInput> | Prisma.RefreshTokenCreateWithoutUserInput[] | Prisma.RefreshTokenUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.RefreshTokenCreateOrConnectWithoutUserInput | Prisma.RefreshTokenCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.RefreshTokenCreateManyUserInputEnvelope;
    connect?: Prisma.RefreshTokenWhereUniqueInput | Prisma.RefreshTokenWhereUniqueInput[];
};
export type RefreshTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.RefreshTokenCreateWithoutUserInput, Prisma.RefreshTokenUncheckedCreateWithoutUserInput> | Prisma.RefreshTokenCreateWithoutUserInput[] | Prisma.RefreshTokenUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.RefreshTokenCreateOrConnectWithoutUserInput | Prisma.RefreshTokenCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.RefreshTokenCreateManyUserInputEnvelope;
    connect?: Prisma.RefreshTokenWhereUniqueInput | Prisma.RefreshTokenWhereUniqueInput[];
};
export type RefreshTokenUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.RefreshTokenCreateWithoutUserInput, Prisma.RefreshTokenUncheckedCreateWithoutUserInput> | Prisma.RefreshTokenCreateWithoutUserInput[] | Prisma.RefreshTokenUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.RefreshTokenCreateOrConnectWithoutUserInput | Prisma.RefreshTokenCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.RefreshTokenUpsertWithWhereUniqueWithoutUserInput | Prisma.RefreshTokenUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.RefreshTokenCreateManyUserInputEnvelope;
    set?: Prisma.RefreshTokenWhereUniqueInput | Prisma.RefreshTokenWhereUniqueInput[];
    disconnect?: Prisma.RefreshTokenWhereUniqueInput | Prisma.RefreshTokenWhereUniqueInput[];
    delete?: Prisma.RefreshTokenWhereUniqueInput | Prisma.RefreshTokenWhereUniqueInput[];
    connect?: Prisma.RefreshTokenWhereUniqueInput | Prisma.RefreshTokenWhereUniqueInput[];
    update?: Prisma.RefreshTokenUpdateWithWhereUniqueWithoutUserInput | Prisma.RefreshTokenUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.RefreshTokenUpdateManyWithWhereWithoutUserInput | Prisma.RefreshTokenUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.RefreshTokenScalarWhereInput | Prisma.RefreshTokenScalarWhereInput[];
};
export type RefreshTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.RefreshTokenCreateWithoutUserInput, Prisma.RefreshTokenUncheckedCreateWithoutUserInput> | Prisma.RefreshTokenCreateWithoutUserInput[] | Prisma.RefreshTokenUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.RefreshTokenCreateOrConnectWithoutUserInput | Prisma.RefreshTokenCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.RefreshTokenUpsertWithWhereUniqueWithoutUserInput | Prisma.RefreshTokenUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.RefreshTokenCreateManyUserInputEnvelope;
    set?: Prisma.RefreshTokenWhereUniqueInput | Prisma.RefreshTokenWhereUniqueInput[];
    disconnect?: Prisma.RefreshTokenWhereUniqueInput | Prisma.RefreshTokenWhereUniqueInput[];
    delete?: Prisma.RefreshTokenWhereUniqueInput | Prisma.RefreshTokenWhereUniqueInput[];
    connect?: Prisma.RefreshTokenWhereUniqueInput | Prisma.RefreshTokenWhereUniqueInput[];
    update?: Prisma.RefreshTokenUpdateWithWhereUniqueWithoutUserInput | Prisma.RefreshTokenUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.RefreshTokenUpdateManyWithWhereWithoutUserInput | Prisma.RefreshTokenUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.RefreshTokenScalarWhereInput | Prisma.RefreshTokenScalarWhereInput[];
};
export type RefreshTokenCreateNestedOneWithoutReplacesInput = {
    create?: Prisma.XOR<Prisma.RefreshTokenCreateWithoutReplacesInput, Prisma.RefreshTokenUncheckedCreateWithoutReplacesInput>;
    connectOrCreate?: Prisma.RefreshTokenCreateOrConnectWithoutReplacesInput;
    connect?: Prisma.RefreshTokenWhereUniqueInput;
};
export type RefreshTokenCreateNestedOneWithoutReplacedByInput = {
    create?: Prisma.XOR<Prisma.RefreshTokenCreateWithoutReplacedByInput, Prisma.RefreshTokenUncheckedCreateWithoutReplacedByInput>;
    connectOrCreate?: Prisma.RefreshTokenCreateOrConnectWithoutReplacedByInput;
    connect?: Prisma.RefreshTokenWhereUniqueInput;
};
export type RefreshTokenUncheckedCreateNestedOneWithoutReplacedByInput = {
    create?: Prisma.XOR<Prisma.RefreshTokenCreateWithoutReplacedByInput, Prisma.RefreshTokenUncheckedCreateWithoutReplacedByInput>;
    connectOrCreate?: Prisma.RefreshTokenCreateOrConnectWithoutReplacedByInput;
    connect?: Prisma.RefreshTokenWhereUniqueInput;
};
export type RefreshTokenUpdateOneWithoutReplacesNestedInput = {
    create?: Prisma.XOR<Prisma.RefreshTokenCreateWithoutReplacesInput, Prisma.RefreshTokenUncheckedCreateWithoutReplacesInput>;
    connectOrCreate?: Prisma.RefreshTokenCreateOrConnectWithoutReplacesInput;
    upsert?: Prisma.RefreshTokenUpsertWithoutReplacesInput;
    disconnect?: Prisma.RefreshTokenWhereInput | boolean;
    delete?: Prisma.RefreshTokenWhereInput | boolean;
    connect?: Prisma.RefreshTokenWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RefreshTokenUpdateToOneWithWhereWithoutReplacesInput, Prisma.RefreshTokenUpdateWithoutReplacesInput>, Prisma.RefreshTokenUncheckedUpdateWithoutReplacesInput>;
};
export type RefreshTokenUpdateOneWithoutReplacedByNestedInput = {
    create?: Prisma.XOR<Prisma.RefreshTokenCreateWithoutReplacedByInput, Prisma.RefreshTokenUncheckedCreateWithoutReplacedByInput>;
    connectOrCreate?: Prisma.RefreshTokenCreateOrConnectWithoutReplacedByInput;
    upsert?: Prisma.RefreshTokenUpsertWithoutReplacedByInput;
    disconnect?: Prisma.RefreshTokenWhereInput | boolean;
    delete?: Prisma.RefreshTokenWhereInput | boolean;
    connect?: Prisma.RefreshTokenWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RefreshTokenUpdateToOneWithWhereWithoutReplacedByInput, Prisma.RefreshTokenUpdateWithoutReplacedByInput>, Prisma.RefreshTokenUncheckedUpdateWithoutReplacedByInput>;
};
export type RefreshTokenUncheckedUpdateOneWithoutReplacedByNestedInput = {
    create?: Prisma.XOR<Prisma.RefreshTokenCreateWithoutReplacedByInput, Prisma.RefreshTokenUncheckedCreateWithoutReplacedByInput>;
    connectOrCreate?: Prisma.RefreshTokenCreateOrConnectWithoutReplacedByInput;
    upsert?: Prisma.RefreshTokenUpsertWithoutReplacedByInput;
    disconnect?: Prisma.RefreshTokenWhereInput | boolean;
    delete?: Prisma.RefreshTokenWhereInput | boolean;
    connect?: Prisma.RefreshTokenWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.RefreshTokenUpdateToOneWithWhereWithoutReplacedByInput, Prisma.RefreshTokenUpdateWithoutReplacedByInput>, Prisma.RefreshTokenUncheckedUpdateWithoutReplacedByInput>;
};
export type RefreshTokenCreateWithoutUserInput = {
    id?: string;
    tokenHash: string;
    deviceId: string;
    deviceName?: string | null;
    expiresAt: Date | string;
    revokedAt?: Date | string | null;
    lastUsedAt?: Date | string | null;
    createdAt?: Date | string;
    replacedBy?: Prisma.RefreshTokenCreateNestedOneWithoutReplacesInput;
    replaces?: Prisma.RefreshTokenCreateNestedOneWithoutReplacedByInput;
};
export type RefreshTokenUncheckedCreateWithoutUserInput = {
    id?: string;
    tokenHash: string;
    deviceId: string;
    deviceName?: string | null;
    expiresAt: Date | string;
    revokedAt?: Date | string | null;
    replacedById?: string | null;
    lastUsedAt?: Date | string | null;
    createdAt?: Date | string;
    replaces?: Prisma.RefreshTokenUncheckedCreateNestedOneWithoutReplacedByInput;
};
export type RefreshTokenCreateOrConnectWithoutUserInput = {
    where: Prisma.RefreshTokenWhereUniqueInput;
    create: Prisma.XOR<Prisma.RefreshTokenCreateWithoutUserInput, Prisma.RefreshTokenUncheckedCreateWithoutUserInput>;
};
export type RefreshTokenCreateManyUserInputEnvelope = {
    data: Prisma.RefreshTokenCreateManyUserInput | Prisma.RefreshTokenCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type RefreshTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.RefreshTokenWhereUniqueInput;
    update: Prisma.XOR<Prisma.RefreshTokenUpdateWithoutUserInput, Prisma.RefreshTokenUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.RefreshTokenCreateWithoutUserInput, Prisma.RefreshTokenUncheckedCreateWithoutUserInput>;
};
export type RefreshTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.RefreshTokenWhereUniqueInput;
    data: Prisma.XOR<Prisma.RefreshTokenUpdateWithoutUserInput, Prisma.RefreshTokenUncheckedUpdateWithoutUserInput>;
};
export type RefreshTokenUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.RefreshTokenScalarWhereInput;
    data: Prisma.XOR<Prisma.RefreshTokenUpdateManyMutationInput, Prisma.RefreshTokenUncheckedUpdateManyWithoutUserInput>;
};
export type RefreshTokenScalarWhereInput = {
    AND?: Prisma.RefreshTokenScalarWhereInput | Prisma.RefreshTokenScalarWhereInput[];
    OR?: Prisma.RefreshTokenScalarWhereInput[];
    NOT?: Prisma.RefreshTokenScalarWhereInput | Prisma.RefreshTokenScalarWhereInput[];
    id?: Prisma.UuidFilter<"RefreshToken"> | string;
    userId?: Prisma.UuidFilter<"RefreshToken"> | string;
    tokenHash?: Prisma.StringFilter<"RefreshToken"> | string;
    deviceId?: Prisma.StringFilter<"RefreshToken"> | string;
    deviceName?: Prisma.StringNullableFilter<"RefreshToken"> | string | null;
    expiresAt?: Prisma.DateTimeFilter<"RefreshToken"> | Date | string;
    revokedAt?: Prisma.DateTimeNullableFilter<"RefreshToken"> | Date | string | null;
    replacedById?: Prisma.UuidNullableFilter<"RefreshToken"> | string | null;
    lastUsedAt?: Prisma.DateTimeNullableFilter<"RefreshToken"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"RefreshToken"> | Date | string;
};
export type RefreshTokenCreateWithoutReplacesInput = {
    id?: string;
    tokenHash: string;
    deviceId: string;
    deviceName?: string | null;
    expiresAt: Date | string;
    revokedAt?: Date | string | null;
    lastUsedAt?: Date | string | null;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutRefreshTokensInput;
    replacedBy?: Prisma.RefreshTokenCreateNestedOneWithoutReplacesInput;
};
export type RefreshTokenUncheckedCreateWithoutReplacesInput = {
    id?: string;
    userId: string;
    tokenHash: string;
    deviceId: string;
    deviceName?: string | null;
    expiresAt: Date | string;
    revokedAt?: Date | string | null;
    replacedById?: string | null;
    lastUsedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type RefreshTokenCreateOrConnectWithoutReplacesInput = {
    where: Prisma.RefreshTokenWhereUniqueInput;
    create: Prisma.XOR<Prisma.RefreshTokenCreateWithoutReplacesInput, Prisma.RefreshTokenUncheckedCreateWithoutReplacesInput>;
};
export type RefreshTokenCreateWithoutReplacedByInput = {
    id?: string;
    tokenHash: string;
    deviceId: string;
    deviceName?: string | null;
    expiresAt: Date | string;
    revokedAt?: Date | string | null;
    lastUsedAt?: Date | string | null;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutRefreshTokensInput;
    replaces?: Prisma.RefreshTokenCreateNestedOneWithoutReplacedByInput;
};
export type RefreshTokenUncheckedCreateWithoutReplacedByInput = {
    id?: string;
    userId: string;
    tokenHash: string;
    deviceId: string;
    deviceName?: string | null;
    expiresAt: Date | string;
    revokedAt?: Date | string | null;
    lastUsedAt?: Date | string | null;
    createdAt?: Date | string;
    replaces?: Prisma.RefreshTokenUncheckedCreateNestedOneWithoutReplacedByInput;
};
export type RefreshTokenCreateOrConnectWithoutReplacedByInput = {
    where: Prisma.RefreshTokenWhereUniqueInput;
    create: Prisma.XOR<Prisma.RefreshTokenCreateWithoutReplacedByInput, Prisma.RefreshTokenUncheckedCreateWithoutReplacedByInput>;
};
export type RefreshTokenUpsertWithoutReplacesInput = {
    update: Prisma.XOR<Prisma.RefreshTokenUpdateWithoutReplacesInput, Prisma.RefreshTokenUncheckedUpdateWithoutReplacesInput>;
    create: Prisma.XOR<Prisma.RefreshTokenCreateWithoutReplacesInput, Prisma.RefreshTokenUncheckedCreateWithoutReplacesInput>;
    where?: Prisma.RefreshTokenWhereInput;
};
export type RefreshTokenUpdateToOneWithWhereWithoutReplacesInput = {
    where?: Prisma.RefreshTokenWhereInput;
    data: Prisma.XOR<Prisma.RefreshTokenUpdateWithoutReplacesInput, Prisma.RefreshTokenUncheckedUpdateWithoutReplacesInput>;
};
export type RefreshTokenUpdateWithoutReplacesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    deviceId?: Prisma.StringFieldUpdateOperationsInput | string;
    deviceName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    revokedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastUsedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutRefreshTokensNestedInput;
    replacedBy?: Prisma.RefreshTokenUpdateOneWithoutReplacesNestedInput;
};
export type RefreshTokenUncheckedUpdateWithoutReplacesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    deviceId?: Prisma.StringFieldUpdateOperationsInput | string;
    deviceName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    revokedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    replacedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastUsedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RefreshTokenUpsertWithoutReplacedByInput = {
    update: Prisma.XOR<Prisma.RefreshTokenUpdateWithoutReplacedByInput, Prisma.RefreshTokenUncheckedUpdateWithoutReplacedByInput>;
    create: Prisma.XOR<Prisma.RefreshTokenCreateWithoutReplacedByInput, Prisma.RefreshTokenUncheckedCreateWithoutReplacedByInput>;
    where?: Prisma.RefreshTokenWhereInput;
};
export type RefreshTokenUpdateToOneWithWhereWithoutReplacedByInput = {
    where?: Prisma.RefreshTokenWhereInput;
    data: Prisma.XOR<Prisma.RefreshTokenUpdateWithoutReplacedByInput, Prisma.RefreshTokenUncheckedUpdateWithoutReplacedByInput>;
};
export type RefreshTokenUpdateWithoutReplacedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    deviceId?: Prisma.StringFieldUpdateOperationsInput | string;
    deviceName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    revokedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastUsedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutRefreshTokensNestedInput;
    replaces?: Prisma.RefreshTokenUpdateOneWithoutReplacedByNestedInput;
};
export type RefreshTokenUncheckedUpdateWithoutReplacedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    deviceId?: Prisma.StringFieldUpdateOperationsInput | string;
    deviceName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    revokedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastUsedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    replaces?: Prisma.RefreshTokenUncheckedUpdateOneWithoutReplacedByNestedInput;
};
export type RefreshTokenCreateManyUserInput = {
    id?: string;
    tokenHash: string;
    deviceId: string;
    deviceName?: string | null;
    expiresAt: Date | string;
    revokedAt?: Date | string | null;
    replacedById?: string | null;
    lastUsedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type RefreshTokenUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    deviceId?: Prisma.StringFieldUpdateOperationsInput | string;
    deviceName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    revokedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    lastUsedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    replacedBy?: Prisma.RefreshTokenUpdateOneWithoutReplacesNestedInput;
    replaces?: Prisma.RefreshTokenUpdateOneWithoutReplacedByNestedInput;
};
export type RefreshTokenUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    deviceId?: Prisma.StringFieldUpdateOperationsInput | string;
    deviceName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    revokedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    replacedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastUsedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    replaces?: Prisma.RefreshTokenUncheckedUpdateOneWithoutReplacedByNestedInput;
};
export type RefreshTokenUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tokenHash?: Prisma.StringFieldUpdateOperationsInput | string;
    deviceId?: Prisma.StringFieldUpdateOperationsInput | string;
    deviceName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    expiresAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    revokedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    replacedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    lastUsedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type RefreshTokenSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    tokenHash?: boolean;
    deviceId?: boolean;
    deviceName?: boolean;
    expiresAt?: boolean;
    revokedAt?: boolean;
    replacedById?: boolean;
    lastUsedAt?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    replacedBy?: boolean | Prisma.RefreshToken$replacedByArgs<ExtArgs>;
    replaces?: boolean | Prisma.RefreshToken$replacesArgs<ExtArgs>;
}, ExtArgs["result"]["refreshToken"]>;
export type RefreshTokenSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    tokenHash?: boolean;
    deviceId?: boolean;
    deviceName?: boolean;
    expiresAt?: boolean;
    revokedAt?: boolean;
    replacedById?: boolean;
    lastUsedAt?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    replacedBy?: boolean | Prisma.RefreshToken$replacedByArgs<ExtArgs>;
}, ExtArgs["result"]["refreshToken"]>;
export type RefreshTokenSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    tokenHash?: boolean;
    deviceId?: boolean;
    deviceName?: boolean;
    expiresAt?: boolean;
    revokedAt?: boolean;
    replacedById?: boolean;
    lastUsedAt?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    replacedBy?: boolean | Prisma.RefreshToken$replacedByArgs<ExtArgs>;
}, ExtArgs["result"]["refreshToken"]>;
export type RefreshTokenSelectScalar = {
    id?: boolean;
    userId?: boolean;
    tokenHash?: boolean;
    deviceId?: boolean;
    deviceName?: boolean;
    expiresAt?: boolean;
    revokedAt?: boolean;
    replacedById?: boolean;
    lastUsedAt?: boolean;
    createdAt?: boolean;
};
export type RefreshTokenOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "tokenHash" | "deviceId" | "deviceName" | "expiresAt" | "revokedAt" | "replacedById" | "lastUsedAt" | "createdAt", ExtArgs["result"]["refreshToken"]>;
export type RefreshTokenInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    replacedBy?: boolean | Prisma.RefreshToken$replacedByArgs<ExtArgs>;
    replaces?: boolean | Prisma.RefreshToken$replacesArgs<ExtArgs>;
};
export type RefreshTokenIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    replacedBy?: boolean | Prisma.RefreshToken$replacedByArgs<ExtArgs>;
};
export type RefreshTokenIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    replacedBy?: boolean | Prisma.RefreshToken$replacedByArgs<ExtArgs>;
};
export type $RefreshTokenPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "RefreshToken";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        replacedBy: Prisma.$RefreshTokenPayload<ExtArgs> | null;
        replaces: Prisma.$RefreshTokenPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        tokenHash: string;
        deviceId: string;
        deviceName: string | null;
        expiresAt: Date;
        revokedAt: Date | null;
        replacedById: string | null;
        lastUsedAt: Date | null;
        createdAt: Date;
    }, ExtArgs["result"]["refreshToken"]>;
    composites: {};
};
export type RefreshTokenGetPayload<S extends boolean | null | undefined | RefreshTokenDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$RefreshTokenPayload, S>;
export type RefreshTokenCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<RefreshTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: RefreshTokenCountAggregateInputType | true;
};
export interface RefreshTokenDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['RefreshToken'];
        meta: {
            name: 'RefreshToken';
        };
    };
    findUnique<T extends RefreshTokenFindUniqueArgs>(args: Prisma.SelectSubset<T, RefreshTokenFindUniqueArgs<ExtArgs>>): Prisma.Prisma__RefreshTokenClient<runtime.Types.Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends RefreshTokenFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, RefreshTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__RefreshTokenClient<runtime.Types.Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends RefreshTokenFindFirstArgs>(args?: Prisma.SelectSubset<T, RefreshTokenFindFirstArgs<ExtArgs>>): Prisma.Prisma__RefreshTokenClient<runtime.Types.Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends RefreshTokenFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, RefreshTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__RefreshTokenClient<runtime.Types.Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends RefreshTokenFindManyArgs>(args?: Prisma.SelectSubset<T, RefreshTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends RefreshTokenCreateArgs>(args: Prisma.SelectSubset<T, RefreshTokenCreateArgs<ExtArgs>>): Prisma.Prisma__RefreshTokenClient<runtime.Types.Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends RefreshTokenCreateManyArgs>(args?: Prisma.SelectSubset<T, RefreshTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends RefreshTokenCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, RefreshTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends RefreshTokenDeleteArgs>(args: Prisma.SelectSubset<T, RefreshTokenDeleteArgs<ExtArgs>>): Prisma.Prisma__RefreshTokenClient<runtime.Types.Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends RefreshTokenUpdateArgs>(args: Prisma.SelectSubset<T, RefreshTokenUpdateArgs<ExtArgs>>): Prisma.Prisma__RefreshTokenClient<runtime.Types.Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends RefreshTokenDeleteManyArgs>(args?: Prisma.SelectSubset<T, RefreshTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends RefreshTokenUpdateManyArgs>(args: Prisma.SelectSubset<T, RefreshTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends RefreshTokenUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, RefreshTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends RefreshTokenUpsertArgs>(args: Prisma.SelectSubset<T, RefreshTokenUpsertArgs<ExtArgs>>): Prisma.Prisma__RefreshTokenClient<runtime.Types.Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends RefreshTokenCountArgs>(args?: Prisma.Subset<T, RefreshTokenCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], RefreshTokenCountAggregateOutputType> : number>;
    aggregate<T extends RefreshTokenAggregateArgs>(args: Prisma.Subset<T, RefreshTokenAggregateArgs>): Prisma.PrismaPromise<GetRefreshTokenAggregateType<T>>;
    groupBy<T extends RefreshTokenGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: RefreshTokenGroupByArgs['orderBy'];
    } : {
        orderBy?: RefreshTokenGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, RefreshTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRefreshTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: RefreshTokenFieldRefs;
}
export interface Prisma__RefreshTokenClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    replacedBy<T extends Prisma.RefreshToken$replacedByArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.RefreshToken$replacedByArgs<ExtArgs>>): Prisma.Prisma__RefreshTokenClient<runtime.Types.Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    replaces<T extends Prisma.RefreshToken$replacesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.RefreshToken$replacesArgs<ExtArgs>>): Prisma.Prisma__RefreshTokenClient<runtime.Types.Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface RefreshTokenFieldRefs {
    readonly id: Prisma.FieldRef<"RefreshToken", 'String'>;
    readonly userId: Prisma.FieldRef<"RefreshToken", 'String'>;
    readonly tokenHash: Prisma.FieldRef<"RefreshToken", 'String'>;
    readonly deviceId: Prisma.FieldRef<"RefreshToken", 'String'>;
    readonly deviceName: Prisma.FieldRef<"RefreshToken", 'String'>;
    readonly expiresAt: Prisma.FieldRef<"RefreshToken", 'DateTime'>;
    readonly revokedAt: Prisma.FieldRef<"RefreshToken", 'DateTime'>;
    readonly replacedById: Prisma.FieldRef<"RefreshToken", 'String'>;
    readonly lastUsedAt: Prisma.FieldRef<"RefreshToken", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"RefreshToken", 'DateTime'>;
}
export type RefreshTokenFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefreshTokenSelect<ExtArgs> | null;
    omit?: Prisma.RefreshTokenOmit<ExtArgs> | null;
    include?: Prisma.RefreshTokenInclude<ExtArgs> | null;
    where: Prisma.RefreshTokenWhereUniqueInput;
};
export type RefreshTokenFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefreshTokenSelect<ExtArgs> | null;
    omit?: Prisma.RefreshTokenOmit<ExtArgs> | null;
    include?: Prisma.RefreshTokenInclude<ExtArgs> | null;
    where: Prisma.RefreshTokenWhereUniqueInput;
};
export type RefreshTokenFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefreshTokenSelect<ExtArgs> | null;
    omit?: Prisma.RefreshTokenOmit<ExtArgs> | null;
    include?: Prisma.RefreshTokenInclude<ExtArgs> | null;
    where?: Prisma.RefreshTokenWhereInput;
    orderBy?: Prisma.RefreshTokenOrderByWithRelationInput | Prisma.RefreshTokenOrderByWithRelationInput[];
    cursor?: Prisma.RefreshTokenWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RefreshTokenScalarFieldEnum | Prisma.RefreshTokenScalarFieldEnum[];
};
export type RefreshTokenFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefreshTokenSelect<ExtArgs> | null;
    omit?: Prisma.RefreshTokenOmit<ExtArgs> | null;
    include?: Prisma.RefreshTokenInclude<ExtArgs> | null;
    where?: Prisma.RefreshTokenWhereInput;
    orderBy?: Prisma.RefreshTokenOrderByWithRelationInput | Prisma.RefreshTokenOrderByWithRelationInput[];
    cursor?: Prisma.RefreshTokenWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RefreshTokenScalarFieldEnum | Prisma.RefreshTokenScalarFieldEnum[];
};
export type RefreshTokenFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefreshTokenSelect<ExtArgs> | null;
    omit?: Prisma.RefreshTokenOmit<ExtArgs> | null;
    include?: Prisma.RefreshTokenInclude<ExtArgs> | null;
    where?: Prisma.RefreshTokenWhereInput;
    orderBy?: Prisma.RefreshTokenOrderByWithRelationInput | Prisma.RefreshTokenOrderByWithRelationInput[];
    cursor?: Prisma.RefreshTokenWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RefreshTokenScalarFieldEnum | Prisma.RefreshTokenScalarFieldEnum[];
};
export type RefreshTokenCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefreshTokenSelect<ExtArgs> | null;
    omit?: Prisma.RefreshTokenOmit<ExtArgs> | null;
    include?: Prisma.RefreshTokenInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RefreshTokenCreateInput, Prisma.RefreshTokenUncheckedCreateInput>;
};
export type RefreshTokenCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.RefreshTokenCreateManyInput | Prisma.RefreshTokenCreateManyInput[];
    skipDuplicates?: boolean;
};
export type RefreshTokenCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefreshTokenSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RefreshTokenOmit<ExtArgs> | null;
    data: Prisma.RefreshTokenCreateManyInput | Prisma.RefreshTokenCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.RefreshTokenIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type RefreshTokenUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefreshTokenSelect<ExtArgs> | null;
    omit?: Prisma.RefreshTokenOmit<ExtArgs> | null;
    include?: Prisma.RefreshTokenInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RefreshTokenUpdateInput, Prisma.RefreshTokenUncheckedUpdateInput>;
    where: Prisma.RefreshTokenWhereUniqueInput;
};
export type RefreshTokenUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.RefreshTokenUpdateManyMutationInput, Prisma.RefreshTokenUncheckedUpdateManyInput>;
    where?: Prisma.RefreshTokenWhereInput;
    limit?: number;
};
export type RefreshTokenUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefreshTokenSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.RefreshTokenOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.RefreshTokenUpdateManyMutationInput, Prisma.RefreshTokenUncheckedUpdateManyInput>;
    where?: Prisma.RefreshTokenWhereInput;
    limit?: number;
    include?: Prisma.RefreshTokenIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type RefreshTokenUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefreshTokenSelect<ExtArgs> | null;
    omit?: Prisma.RefreshTokenOmit<ExtArgs> | null;
    include?: Prisma.RefreshTokenInclude<ExtArgs> | null;
    where: Prisma.RefreshTokenWhereUniqueInput;
    create: Prisma.XOR<Prisma.RefreshTokenCreateInput, Prisma.RefreshTokenUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.RefreshTokenUpdateInput, Prisma.RefreshTokenUncheckedUpdateInput>;
};
export type RefreshTokenDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefreshTokenSelect<ExtArgs> | null;
    omit?: Prisma.RefreshTokenOmit<ExtArgs> | null;
    include?: Prisma.RefreshTokenInclude<ExtArgs> | null;
    where: Prisma.RefreshTokenWhereUniqueInput;
};
export type RefreshTokenDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RefreshTokenWhereInput;
    limit?: number;
};
export type RefreshToken$replacedByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefreshTokenSelect<ExtArgs> | null;
    omit?: Prisma.RefreshTokenOmit<ExtArgs> | null;
    include?: Prisma.RefreshTokenInclude<ExtArgs> | null;
    where?: Prisma.RefreshTokenWhereInput;
};
export type RefreshToken$replacesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefreshTokenSelect<ExtArgs> | null;
    omit?: Prisma.RefreshTokenOmit<ExtArgs> | null;
    include?: Prisma.RefreshTokenInclude<ExtArgs> | null;
    where?: Prisma.RefreshTokenWhereInput;
};
export type RefreshTokenDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.RefreshTokenSelect<ExtArgs> | null;
    omit?: Prisma.RefreshTokenOmit<ExtArgs> | null;
    include?: Prisma.RefreshTokenInclude<ExtArgs> | null;
};
