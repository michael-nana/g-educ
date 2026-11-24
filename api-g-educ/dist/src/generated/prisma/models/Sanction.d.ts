import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type SanctionModel = runtime.Types.Result.DefaultSelection<Prisma.$SanctionPayload>;
export type AggregateSanction = {
    _count: SanctionCountAggregateOutputType | null;
    _min: SanctionMinAggregateOutputType | null;
    _max: SanctionMaxAggregateOutputType | null;
};
export type SanctionMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    type: $Enums.SanctionType | null;
    reason: string | null;
    startsAt: Date | null;
    endsAt: Date | null;
    issuedById: string | null;
    reportId: string | null;
    revokedAt: Date | null;
    revokedById: string | null;
    createdAt: Date | null;
};
export type SanctionMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    type: $Enums.SanctionType | null;
    reason: string | null;
    startsAt: Date | null;
    endsAt: Date | null;
    issuedById: string | null;
    reportId: string | null;
    revokedAt: Date | null;
    revokedById: string | null;
    createdAt: Date | null;
};
export type SanctionCountAggregateOutputType = {
    id: number;
    userId: number;
    type: number;
    reason: number;
    startsAt: number;
    endsAt: number;
    issuedById: number;
    reportId: number;
    revokedAt: number;
    revokedById: number;
    createdAt: number;
    _all: number;
};
export type SanctionMinAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    reason?: true;
    startsAt?: true;
    endsAt?: true;
    issuedById?: true;
    reportId?: true;
    revokedAt?: true;
    revokedById?: true;
    createdAt?: true;
};
export type SanctionMaxAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    reason?: true;
    startsAt?: true;
    endsAt?: true;
    issuedById?: true;
    reportId?: true;
    revokedAt?: true;
    revokedById?: true;
    createdAt?: true;
};
export type SanctionCountAggregateInputType = {
    id?: true;
    userId?: true;
    type?: true;
    reason?: true;
    startsAt?: true;
    endsAt?: true;
    issuedById?: true;
    reportId?: true;
    revokedAt?: true;
    revokedById?: true;
    createdAt?: true;
    _all?: true;
};
export type SanctionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SanctionWhereInput;
    orderBy?: Prisma.SanctionOrderByWithRelationInput | Prisma.SanctionOrderByWithRelationInput[];
    cursor?: Prisma.SanctionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SanctionCountAggregateInputType;
    _min?: SanctionMinAggregateInputType;
    _max?: SanctionMaxAggregateInputType;
};
export type GetSanctionAggregateType<T extends SanctionAggregateArgs> = {
    [P in keyof T & keyof AggregateSanction]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSanction[P]> : Prisma.GetScalarType<T[P], AggregateSanction[P]>;
};
export type SanctionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SanctionWhereInput;
    orderBy?: Prisma.SanctionOrderByWithAggregationInput | Prisma.SanctionOrderByWithAggregationInput[];
    by: Prisma.SanctionScalarFieldEnum[] | Prisma.SanctionScalarFieldEnum;
    having?: Prisma.SanctionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SanctionCountAggregateInputType | true;
    _min?: SanctionMinAggregateInputType;
    _max?: SanctionMaxAggregateInputType;
};
export type SanctionGroupByOutputType = {
    id: string;
    userId: string;
    type: $Enums.SanctionType;
    reason: string;
    startsAt: Date;
    endsAt: Date | null;
    issuedById: string;
    reportId: string | null;
    revokedAt: Date | null;
    revokedById: string | null;
    createdAt: Date;
    _count: SanctionCountAggregateOutputType | null;
    _min: SanctionMinAggregateOutputType | null;
    _max: SanctionMaxAggregateOutputType | null;
};
export type GetSanctionGroupByPayload<T extends SanctionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SanctionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SanctionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SanctionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SanctionGroupByOutputType[P]>;
}>>;
export type SanctionWhereInput = {
    AND?: Prisma.SanctionWhereInput | Prisma.SanctionWhereInput[];
    OR?: Prisma.SanctionWhereInput[];
    NOT?: Prisma.SanctionWhereInput | Prisma.SanctionWhereInput[];
    id?: Prisma.UuidFilter<"Sanction"> | string;
    userId?: Prisma.UuidFilter<"Sanction"> | string;
    type?: Prisma.EnumSanctionTypeFilter<"Sanction"> | $Enums.SanctionType;
    reason?: Prisma.StringFilter<"Sanction"> | string;
    startsAt?: Prisma.DateTimeFilter<"Sanction"> | Date | string;
    endsAt?: Prisma.DateTimeNullableFilter<"Sanction"> | Date | string | null;
    issuedById?: Prisma.UuidFilter<"Sanction"> | string;
    reportId?: Prisma.UuidNullableFilter<"Sanction"> | string | null;
    revokedAt?: Prisma.DateTimeNullableFilter<"Sanction"> | Date | string | null;
    revokedById?: Prisma.UuidNullableFilter<"Sanction"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Sanction"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    issuedBy?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    revokedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    report?: Prisma.XOR<Prisma.ReportNullableScalarRelationFilter, Prisma.ReportWhereInput> | null;
};
export type SanctionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    startsAt?: Prisma.SortOrder;
    endsAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    issuedById?: Prisma.SortOrder;
    reportId?: Prisma.SortOrderInput | Prisma.SortOrder;
    revokedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    revokedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    issuedBy?: Prisma.UserOrderByWithRelationInput;
    revokedBy?: Prisma.UserOrderByWithRelationInput;
    report?: Prisma.ReportOrderByWithRelationInput;
};
export type SanctionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.SanctionWhereInput | Prisma.SanctionWhereInput[];
    OR?: Prisma.SanctionWhereInput[];
    NOT?: Prisma.SanctionWhereInput | Prisma.SanctionWhereInput[];
    userId?: Prisma.UuidFilter<"Sanction"> | string;
    type?: Prisma.EnumSanctionTypeFilter<"Sanction"> | $Enums.SanctionType;
    reason?: Prisma.StringFilter<"Sanction"> | string;
    startsAt?: Prisma.DateTimeFilter<"Sanction"> | Date | string;
    endsAt?: Prisma.DateTimeNullableFilter<"Sanction"> | Date | string | null;
    issuedById?: Prisma.UuidFilter<"Sanction"> | string;
    reportId?: Prisma.UuidNullableFilter<"Sanction"> | string | null;
    revokedAt?: Prisma.DateTimeNullableFilter<"Sanction"> | Date | string | null;
    revokedById?: Prisma.UuidNullableFilter<"Sanction"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Sanction"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    issuedBy?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    revokedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    report?: Prisma.XOR<Prisma.ReportNullableScalarRelationFilter, Prisma.ReportWhereInput> | null;
}, "id">;
export type SanctionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    startsAt?: Prisma.SortOrder;
    endsAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    issuedById?: Prisma.SortOrder;
    reportId?: Prisma.SortOrderInput | Prisma.SortOrder;
    revokedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    revokedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.SanctionCountOrderByAggregateInput;
    _max?: Prisma.SanctionMaxOrderByAggregateInput;
    _min?: Prisma.SanctionMinOrderByAggregateInput;
};
export type SanctionScalarWhereWithAggregatesInput = {
    AND?: Prisma.SanctionScalarWhereWithAggregatesInput | Prisma.SanctionScalarWhereWithAggregatesInput[];
    OR?: Prisma.SanctionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SanctionScalarWhereWithAggregatesInput | Prisma.SanctionScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Sanction"> | string;
    userId?: Prisma.UuidWithAggregatesFilter<"Sanction"> | string;
    type?: Prisma.EnumSanctionTypeWithAggregatesFilter<"Sanction"> | $Enums.SanctionType;
    reason?: Prisma.StringWithAggregatesFilter<"Sanction"> | string;
    startsAt?: Prisma.DateTimeWithAggregatesFilter<"Sanction"> | Date | string;
    endsAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Sanction"> | Date | string | null;
    issuedById?: Prisma.UuidWithAggregatesFilter<"Sanction"> | string;
    reportId?: Prisma.UuidNullableWithAggregatesFilter<"Sanction"> | string | null;
    revokedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Sanction"> | Date | string | null;
    revokedById?: Prisma.UuidNullableWithAggregatesFilter<"Sanction"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Sanction"> | Date | string;
};
export type SanctionCreateInput = {
    id?: string;
    type: $Enums.SanctionType;
    reason: string;
    startsAt?: Date | string;
    endsAt?: Date | string | null;
    revokedAt?: Date | string | null;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutSanctionsReceivedInput;
    issuedBy: Prisma.UserCreateNestedOneWithoutSanctionsIssuedInput;
    revokedBy?: Prisma.UserCreateNestedOneWithoutSanctionsRevokedInput;
    report?: Prisma.ReportCreateNestedOneWithoutSanctionsInput;
};
export type SanctionUncheckedCreateInput = {
    id?: string;
    userId: string;
    type: $Enums.SanctionType;
    reason: string;
    startsAt?: Date | string;
    endsAt?: Date | string | null;
    issuedById: string;
    reportId?: string | null;
    revokedAt?: Date | string | null;
    revokedById?: string | null;
    createdAt?: Date | string;
};
export type SanctionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumSanctionTypeFieldUpdateOperationsInput | $Enums.SanctionType;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    revokedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutSanctionsReceivedNestedInput;
    issuedBy?: Prisma.UserUpdateOneRequiredWithoutSanctionsIssuedNestedInput;
    revokedBy?: Prisma.UserUpdateOneWithoutSanctionsRevokedNestedInput;
    report?: Prisma.ReportUpdateOneWithoutSanctionsNestedInput;
};
export type SanctionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumSanctionTypeFieldUpdateOperationsInput | $Enums.SanctionType;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    issuedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reportId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    revokedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    revokedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SanctionCreateManyInput = {
    id?: string;
    userId: string;
    type: $Enums.SanctionType;
    reason: string;
    startsAt?: Date | string;
    endsAt?: Date | string | null;
    issuedById: string;
    reportId?: string | null;
    revokedAt?: Date | string | null;
    revokedById?: string | null;
    createdAt?: Date | string;
};
export type SanctionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumSanctionTypeFieldUpdateOperationsInput | $Enums.SanctionType;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    revokedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SanctionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumSanctionTypeFieldUpdateOperationsInput | $Enums.SanctionType;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    issuedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reportId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    revokedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    revokedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SanctionListRelationFilter = {
    every?: Prisma.SanctionWhereInput;
    some?: Prisma.SanctionWhereInput;
    none?: Prisma.SanctionWhereInput;
};
export type SanctionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type SanctionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    startsAt?: Prisma.SortOrder;
    endsAt?: Prisma.SortOrder;
    issuedById?: Prisma.SortOrder;
    reportId?: Prisma.SortOrder;
    revokedAt?: Prisma.SortOrder;
    revokedById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type SanctionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    startsAt?: Prisma.SortOrder;
    endsAt?: Prisma.SortOrder;
    issuedById?: Prisma.SortOrder;
    reportId?: Prisma.SortOrder;
    revokedAt?: Prisma.SortOrder;
    revokedById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type SanctionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    startsAt?: Prisma.SortOrder;
    endsAt?: Prisma.SortOrder;
    issuedById?: Prisma.SortOrder;
    reportId?: Prisma.SortOrder;
    revokedAt?: Prisma.SortOrder;
    revokedById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type SanctionCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.SanctionCreateWithoutUserInput, Prisma.SanctionUncheckedCreateWithoutUserInput> | Prisma.SanctionCreateWithoutUserInput[] | Prisma.SanctionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.SanctionCreateOrConnectWithoutUserInput | Prisma.SanctionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.SanctionCreateManyUserInputEnvelope;
    connect?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
};
export type SanctionCreateNestedManyWithoutIssuedByInput = {
    create?: Prisma.XOR<Prisma.SanctionCreateWithoutIssuedByInput, Prisma.SanctionUncheckedCreateWithoutIssuedByInput> | Prisma.SanctionCreateWithoutIssuedByInput[] | Prisma.SanctionUncheckedCreateWithoutIssuedByInput[];
    connectOrCreate?: Prisma.SanctionCreateOrConnectWithoutIssuedByInput | Prisma.SanctionCreateOrConnectWithoutIssuedByInput[];
    createMany?: Prisma.SanctionCreateManyIssuedByInputEnvelope;
    connect?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
};
export type SanctionCreateNestedManyWithoutRevokedByInput = {
    create?: Prisma.XOR<Prisma.SanctionCreateWithoutRevokedByInput, Prisma.SanctionUncheckedCreateWithoutRevokedByInput> | Prisma.SanctionCreateWithoutRevokedByInput[] | Prisma.SanctionUncheckedCreateWithoutRevokedByInput[];
    connectOrCreate?: Prisma.SanctionCreateOrConnectWithoutRevokedByInput | Prisma.SanctionCreateOrConnectWithoutRevokedByInput[];
    createMany?: Prisma.SanctionCreateManyRevokedByInputEnvelope;
    connect?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
};
export type SanctionUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.SanctionCreateWithoutUserInput, Prisma.SanctionUncheckedCreateWithoutUserInput> | Prisma.SanctionCreateWithoutUserInput[] | Prisma.SanctionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.SanctionCreateOrConnectWithoutUserInput | Prisma.SanctionCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.SanctionCreateManyUserInputEnvelope;
    connect?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
};
export type SanctionUncheckedCreateNestedManyWithoutIssuedByInput = {
    create?: Prisma.XOR<Prisma.SanctionCreateWithoutIssuedByInput, Prisma.SanctionUncheckedCreateWithoutIssuedByInput> | Prisma.SanctionCreateWithoutIssuedByInput[] | Prisma.SanctionUncheckedCreateWithoutIssuedByInput[];
    connectOrCreate?: Prisma.SanctionCreateOrConnectWithoutIssuedByInput | Prisma.SanctionCreateOrConnectWithoutIssuedByInput[];
    createMany?: Prisma.SanctionCreateManyIssuedByInputEnvelope;
    connect?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
};
export type SanctionUncheckedCreateNestedManyWithoutRevokedByInput = {
    create?: Prisma.XOR<Prisma.SanctionCreateWithoutRevokedByInput, Prisma.SanctionUncheckedCreateWithoutRevokedByInput> | Prisma.SanctionCreateWithoutRevokedByInput[] | Prisma.SanctionUncheckedCreateWithoutRevokedByInput[];
    connectOrCreate?: Prisma.SanctionCreateOrConnectWithoutRevokedByInput | Prisma.SanctionCreateOrConnectWithoutRevokedByInput[];
    createMany?: Prisma.SanctionCreateManyRevokedByInputEnvelope;
    connect?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
};
export type SanctionUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.SanctionCreateWithoutUserInput, Prisma.SanctionUncheckedCreateWithoutUserInput> | Prisma.SanctionCreateWithoutUserInput[] | Prisma.SanctionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.SanctionCreateOrConnectWithoutUserInput | Prisma.SanctionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.SanctionUpsertWithWhereUniqueWithoutUserInput | Prisma.SanctionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.SanctionCreateManyUserInputEnvelope;
    set?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    disconnect?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    delete?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    connect?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    update?: Prisma.SanctionUpdateWithWhereUniqueWithoutUserInput | Prisma.SanctionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.SanctionUpdateManyWithWhereWithoutUserInput | Prisma.SanctionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.SanctionScalarWhereInput | Prisma.SanctionScalarWhereInput[];
};
export type SanctionUpdateManyWithoutIssuedByNestedInput = {
    create?: Prisma.XOR<Prisma.SanctionCreateWithoutIssuedByInput, Prisma.SanctionUncheckedCreateWithoutIssuedByInput> | Prisma.SanctionCreateWithoutIssuedByInput[] | Prisma.SanctionUncheckedCreateWithoutIssuedByInput[];
    connectOrCreate?: Prisma.SanctionCreateOrConnectWithoutIssuedByInput | Prisma.SanctionCreateOrConnectWithoutIssuedByInput[];
    upsert?: Prisma.SanctionUpsertWithWhereUniqueWithoutIssuedByInput | Prisma.SanctionUpsertWithWhereUniqueWithoutIssuedByInput[];
    createMany?: Prisma.SanctionCreateManyIssuedByInputEnvelope;
    set?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    disconnect?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    delete?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    connect?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    update?: Prisma.SanctionUpdateWithWhereUniqueWithoutIssuedByInput | Prisma.SanctionUpdateWithWhereUniqueWithoutIssuedByInput[];
    updateMany?: Prisma.SanctionUpdateManyWithWhereWithoutIssuedByInput | Prisma.SanctionUpdateManyWithWhereWithoutIssuedByInput[];
    deleteMany?: Prisma.SanctionScalarWhereInput | Prisma.SanctionScalarWhereInput[];
};
export type SanctionUpdateManyWithoutRevokedByNestedInput = {
    create?: Prisma.XOR<Prisma.SanctionCreateWithoutRevokedByInput, Prisma.SanctionUncheckedCreateWithoutRevokedByInput> | Prisma.SanctionCreateWithoutRevokedByInput[] | Prisma.SanctionUncheckedCreateWithoutRevokedByInput[];
    connectOrCreate?: Prisma.SanctionCreateOrConnectWithoutRevokedByInput | Prisma.SanctionCreateOrConnectWithoutRevokedByInput[];
    upsert?: Prisma.SanctionUpsertWithWhereUniqueWithoutRevokedByInput | Prisma.SanctionUpsertWithWhereUniqueWithoutRevokedByInput[];
    createMany?: Prisma.SanctionCreateManyRevokedByInputEnvelope;
    set?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    disconnect?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    delete?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    connect?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    update?: Prisma.SanctionUpdateWithWhereUniqueWithoutRevokedByInput | Prisma.SanctionUpdateWithWhereUniqueWithoutRevokedByInput[];
    updateMany?: Prisma.SanctionUpdateManyWithWhereWithoutRevokedByInput | Prisma.SanctionUpdateManyWithWhereWithoutRevokedByInput[];
    deleteMany?: Prisma.SanctionScalarWhereInput | Prisma.SanctionScalarWhereInput[];
};
export type SanctionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.SanctionCreateWithoutUserInput, Prisma.SanctionUncheckedCreateWithoutUserInput> | Prisma.SanctionCreateWithoutUserInput[] | Prisma.SanctionUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.SanctionCreateOrConnectWithoutUserInput | Prisma.SanctionCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.SanctionUpsertWithWhereUniqueWithoutUserInput | Prisma.SanctionUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.SanctionCreateManyUserInputEnvelope;
    set?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    disconnect?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    delete?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    connect?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    update?: Prisma.SanctionUpdateWithWhereUniqueWithoutUserInput | Prisma.SanctionUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.SanctionUpdateManyWithWhereWithoutUserInput | Prisma.SanctionUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.SanctionScalarWhereInput | Prisma.SanctionScalarWhereInput[];
};
export type SanctionUncheckedUpdateManyWithoutIssuedByNestedInput = {
    create?: Prisma.XOR<Prisma.SanctionCreateWithoutIssuedByInput, Prisma.SanctionUncheckedCreateWithoutIssuedByInput> | Prisma.SanctionCreateWithoutIssuedByInput[] | Prisma.SanctionUncheckedCreateWithoutIssuedByInput[];
    connectOrCreate?: Prisma.SanctionCreateOrConnectWithoutIssuedByInput | Prisma.SanctionCreateOrConnectWithoutIssuedByInput[];
    upsert?: Prisma.SanctionUpsertWithWhereUniqueWithoutIssuedByInput | Prisma.SanctionUpsertWithWhereUniqueWithoutIssuedByInput[];
    createMany?: Prisma.SanctionCreateManyIssuedByInputEnvelope;
    set?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    disconnect?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    delete?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    connect?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    update?: Prisma.SanctionUpdateWithWhereUniqueWithoutIssuedByInput | Prisma.SanctionUpdateWithWhereUniqueWithoutIssuedByInput[];
    updateMany?: Prisma.SanctionUpdateManyWithWhereWithoutIssuedByInput | Prisma.SanctionUpdateManyWithWhereWithoutIssuedByInput[];
    deleteMany?: Prisma.SanctionScalarWhereInput | Prisma.SanctionScalarWhereInput[];
};
export type SanctionUncheckedUpdateManyWithoutRevokedByNestedInput = {
    create?: Prisma.XOR<Prisma.SanctionCreateWithoutRevokedByInput, Prisma.SanctionUncheckedCreateWithoutRevokedByInput> | Prisma.SanctionCreateWithoutRevokedByInput[] | Prisma.SanctionUncheckedCreateWithoutRevokedByInput[];
    connectOrCreate?: Prisma.SanctionCreateOrConnectWithoutRevokedByInput | Prisma.SanctionCreateOrConnectWithoutRevokedByInput[];
    upsert?: Prisma.SanctionUpsertWithWhereUniqueWithoutRevokedByInput | Prisma.SanctionUpsertWithWhereUniqueWithoutRevokedByInput[];
    createMany?: Prisma.SanctionCreateManyRevokedByInputEnvelope;
    set?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    disconnect?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    delete?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    connect?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    update?: Prisma.SanctionUpdateWithWhereUniqueWithoutRevokedByInput | Prisma.SanctionUpdateWithWhereUniqueWithoutRevokedByInput[];
    updateMany?: Prisma.SanctionUpdateManyWithWhereWithoutRevokedByInput | Prisma.SanctionUpdateManyWithWhereWithoutRevokedByInput[];
    deleteMany?: Prisma.SanctionScalarWhereInput | Prisma.SanctionScalarWhereInput[];
};
export type SanctionCreateNestedManyWithoutReportInput = {
    create?: Prisma.XOR<Prisma.SanctionCreateWithoutReportInput, Prisma.SanctionUncheckedCreateWithoutReportInput> | Prisma.SanctionCreateWithoutReportInput[] | Prisma.SanctionUncheckedCreateWithoutReportInput[];
    connectOrCreate?: Prisma.SanctionCreateOrConnectWithoutReportInput | Prisma.SanctionCreateOrConnectWithoutReportInput[];
    createMany?: Prisma.SanctionCreateManyReportInputEnvelope;
    connect?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
};
export type SanctionUncheckedCreateNestedManyWithoutReportInput = {
    create?: Prisma.XOR<Prisma.SanctionCreateWithoutReportInput, Prisma.SanctionUncheckedCreateWithoutReportInput> | Prisma.SanctionCreateWithoutReportInput[] | Prisma.SanctionUncheckedCreateWithoutReportInput[];
    connectOrCreate?: Prisma.SanctionCreateOrConnectWithoutReportInput | Prisma.SanctionCreateOrConnectWithoutReportInput[];
    createMany?: Prisma.SanctionCreateManyReportInputEnvelope;
    connect?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
};
export type SanctionUpdateManyWithoutReportNestedInput = {
    create?: Prisma.XOR<Prisma.SanctionCreateWithoutReportInput, Prisma.SanctionUncheckedCreateWithoutReportInput> | Prisma.SanctionCreateWithoutReportInput[] | Prisma.SanctionUncheckedCreateWithoutReportInput[];
    connectOrCreate?: Prisma.SanctionCreateOrConnectWithoutReportInput | Prisma.SanctionCreateOrConnectWithoutReportInput[];
    upsert?: Prisma.SanctionUpsertWithWhereUniqueWithoutReportInput | Prisma.SanctionUpsertWithWhereUniqueWithoutReportInput[];
    createMany?: Prisma.SanctionCreateManyReportInputEnvelope;
    set?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    disconnect?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    delete?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    connect?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    update?: Prisma.SanctionUpdateWithWhereUniqueWithoutReportInput | Prisma.SanctionUpdateWithWhereUniqueWithoutReportInput[];
    updateMany?: Prisma.SanctionUpdateManyWithWhereWithoutReportInput | Prisma.SanctionUpdateManyWithWhereWithoutReportInput[];
    deleteMany?: Prisma.SanctionScalarWhereInput | Prisma.SanctionScalarWhereInput[];
};
export type SanctionUncheckedUpdateManyWithoutReportNestedInput = {
    create?: Prisma.XOR<Prisma.SanctionCreateWithoutReportInput, Prisma.SanctionUncheckedCreateWithoutReportInput> | Prisma.SanctionCreateWithoutReportInput[] | Prisma.SanctionUncheckedCreateWithoutReportInput[];
    connectOrCreate?: Prisma.SanctionCreateOrConnectWithoutReportInput | Prisma.SanctionCreateOrConnectWithoutReportInput[];
    upsert?: Prisma.SanctionUpsertWithWhereUniqueWithoutReportInput | Prisma.SanctionUpsertWithWhereUniqueWithoutReportInput[];
    createMany?: Prisma.SanctionCreateManyReportInputEnvelope;
    set?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    disconnect?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    delete?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    connect?: Prisma.SanctionWhereUniqueInput | Prisma.SanctionWhereUniqueInput[];
    update?: Prisma.SanctionUpdateWithWhereUniqueWithoutReportInput | Prisma.SanctionUpdateWithWhereUniqueWithoutReportInput[];
    updateMany?: Prisma.SanctionUpdateManyWithWhereWithoutReportInput | Prisma.SanctionUpdateManyWithWhereWithoutReportInput[];
    deleteMany?: Prisma.SanctionScalarWhereInput | Prisma.SanctionScalarWhereInput[];
};
export type EnumSanctionTypeFieldUpdateOperationsInput = {
    set?: $Enums.SanctionType;
};
export type SanctionCreateWithoutUserInput = {
    id?: string;
    type: $Enums.SanctionType;
    reason: string;
    startsAt?: Date | string;
    endsAt?: Date | string | null;
    revokedAt?: Date | string | null;
    createdAt?: Date | string;
    issuedBy: Prisma.UserCreateNestedOneWithoutSanctionsIssuedInput;
    revokedBy?: Prisma.UserCreateNestedOneWithoutSanctionsRevokedInput;
    report?: Prisma.ReportCreateNestedOneWithoutSanctionsInput;
};
export type SanctionUncheckedCreateWithoutUserInput = {
    id?: string;
    type: $Enums.SanctionType;
    reason: string;
    startsAt?: Date | string;
    endsAt?: Date | string | null;
    issuedById: string;
    reportId?: string | null;
    revokedAt?: Date | string | null;
    revokedById?: string | null;
    createdAt?: Date | string;
};
export type SanctionCreateOrConnectWithoutUserInput = {
    where: Prisma.SanctionWhereUniqueInput;
    create: Prisma.XOR<Prisma.SanctionCreateWithoutUserInput, Prisma.SanctionUncheckedCreateWithoutUserInput>;
};
export type SanctionCreateManyUserInputEnvelope = {
    data: Prisma.SanctionCreateManyUserInput | Prisma.SanctionCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type SanctionCreateWithoutIssuedByInput = {
    id?: string;
    type: $Enums.SanctionType;
    reason: string;
    startsAt?: Date | string;
    endsAt?: Date | string | null;
    revokedAt?: Date | string | null;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutSanctionsReceivedInput;
    revokedBy?: Prisma.UserCreateNestedOneWithoutSanctionsRevokedInput;
    report?: Prisma.ReportCreateNestedOneWithoutSanctionsInput;
};
export type SanctionUncheckedCreateWithoutIssuedByInput = {
    id?: string;
    userId: string;
    type: $Enums.SanctionType;
    reason: string;
    startsAt?: Date | string;
    endsAt?: Date | string | null;
    reportId?: string | null;
    revokedAt?: Date | string | null;
    revokedById?: string | null;
    createdAt?: Date | string;
};
export type SanctionCreateOrConnectWithoutIssuedByInput = {
    where: Prisma.SanctionWhereUniqueInput;
    create: Prisma.XOR<Prisma.SanctionCreateWithoutIssuedByInput, Prisma.SanctionUncheckedCreateWithoutIssuedByInput>;
};
export type SanctionCreateManyIssuedByInputEnvelope = {
    data: Prisma.SanctionCreateManyIssuedByInput | Prisma.SanctionCreateManyIssuedByInput[];
    skipDuplicates?: boolean;
};
export type SanctionCreateWithoutRevokedByInput = {
    id?: string;
    type: $Enums.SanctionType;
    reason: string;
    startsAt?: Date | string;
    endsAt?: Date | string | null;
    revokedAt?: Date | string | null;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutSanctionsReceivedInput;
    issuedBy: Prisma.UserCreateNestedOneWithoutSanctionsIssuedInput;
    report?: Prisma.ReportCreateNestedOneWithoutSanctionsInput;
};
export type SanctionUncheckedCreateWithoutRevokedByInput = {
    id?: string;
    userId: string;
    type: $Enums.SanctionType;
    reason: string;
    startsAt?: Date | string;
    endsAt?: Date | string | null;
    issuedById: string;
    reportId?: string | null;
    revokedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type SanctionCreateOrConnectWithoutRevokedByInput = {
    where: Prisma.SanctionWhereUniqueInput;
    create: Prisma.XOR<Prisma.SanctionCreateWithoutRevokedByInput, Prisma.SanctionUncheckedCreateWithoutRevokedByInput>;
};
export type SanctionCreateManyRevokedByInputEnvelope = {
    data: Prisma.SanctionCreateManyRevokedByInput | Prisma.SanctionCreateManyRevokedByInput[];
    skipDuplicates?: boolean;
};
export type SanctionUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.SanctionWhereUniqueInput;
    update: Prisma.XOR<Prisma.SanctionUpdateWithoutUserInput, Prisma.SanctionUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.SanctionCreateWithoutUserInput, Prisma.SanctionUncheckedCreateWithoutUserInput>;
};
export type SanctionUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.SanctionWhereUniqueInput;
    data: Prisma.XOR<Prisma.SanctionUpdateWithoutUserInput, Prisma.SanctionUncheckedUpdateWithoutUserInput>;
};
export type SanctionUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.SanctionScalarWhereInput;
    data: Prisma.XOR<Prisma.SanctionUpdateManyMutationInput, Prisma.SanctionUncheckedUpdateManyWithoutUserInput>;
};
export type SanctionScalarWhereInput = {
    AND?: Prisma.SanctionScalarWhereInput | Prisma.SanctionScalarWhereInput[];
    OR?: Prisma.SanctionScalarWhereInput[];
    NOT?: Prisma.SanctionScalarWhereInput | Prisma.SanctionScalarWhereInput[];
    id?: Prisma.UuidFilter<"Sanction"> | string;
    userId?: Prisma.UuidFilter<"Sanction"> | string;
    type?: Prisma.EnumSanctionTypeFilter<"Sanction"> | $Enums.SanctionType;
    reason?: Prisma.StringFilter<"Sanction"> | string;
    startsAt?: Prisma.DateTimeFilter<"Sanction"> | Date | string;
    endsAt?: Prisma.DateTimeNullableFilter<"Sanction"> | Date | string | null;
    issuedById?: Prisma.UuidFilter<"Sanction"> | string;
    reportId?: Prisma.UuidNullableFilter<"Sanction"> | string | null;
    revokedAt?: Prisma.DateTimeNullableFilter<"Sanction"> | Date | string | null;
    revokedById?: Prisma.UuidNullableFilter<"Sanction"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Sanction"> | Date | string;
};
export type SanctionUpsertWithWhereUniqueWithoutIssuedByInput = {
    where: Prisma.SanctionWhereUniqueInput;
    update: Prisma.XOR<Prisma.SanctionUpdateWithoutIssuedByInput, Prisma.SanctionUncheckedUpdateWithoutIssuedByInput>;
    create: Prisma.XOR<Prisma.SanctionCreateWithoutIssuedByInput, Prisma.SanctionUncheckedCreateWithoutIssuedByInput>;
};
export type SanctionUpdateWithWhereUniqueWithoutIssuedByInput = {
    where: Prisma.SanctionWhereUniqueInput;
    data: Prisma.XOR<Prisma.SanctionUpdateWithoutIssuedByInput, Prisma.SanctionUncheckedUpdateWithoutIssuedByInput>;
};
export type SanctionUpdateManyWithWhereWithoutIssuedByInput = {
    where: Prisma.SanctionScalarWhereInput;
    data: Prisma.XOR<Prisma.SanctionUpdateManyMutationInput, Prisma.SanctionUncheckedUpdateManyWithoutIssuedByInput>;
};
export type SanctionUpsertWithWhereUniqueWithoutRevokedByInput = {
    where: Prisma.SanctionWhereUniqueInput;
    update: Prisma.XOR<Prisma.SanctionUpdateWithoutRevokedByInput, Prisma.SanctionUncheckedUpdateWithoutRevokedByInput>;
    create: Prisma.XOR<Prisma.SanctionCreateWithoutRevokedByInput, Prisma.SanctionUncheckedCreateWithoutRevokedByInput>;
};
export type SanctionUpdateWithWhereUniqueWithoutRevokedByInput = {
    where: Prisma.SanctionWhereUniqueInput;
    data: Prisma.XOR<Prisma.SanctionUpdateWithoutRevokedByInput, Prisma.SanctionUncheckedUpdateWithoutRevokedByInput>;
};
export type SanctionUpdateManyWithWhereWithoutRevokedByInput = {
    where: Prisma.SanctionScalarWhereInput;
    data: Prisma.XOR<Prisma.SanctionUpdateManyMutationInput, Prisma.SanctionUncheckedUpdateManyWithoutRevokedByInput>;
};
export type SanctionCreateWithoutReportInput = {
    id?: string;
    type: $Enums.SanctionType;
    reason: string;
    startsAt?: Date | string;
    endsAt?: Date | string | null;
    revokedAt?: Date | string | null;
    createdAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutSanctionsReceivedInput;
    issuedBy: Prisma.UserCreateNestedOneWithoutSanctionsIssuedInput;
    revokedBy?: Prisma.UserCreateNestedOneWithoutSanctionsRevokedInput;
};
export type SanctionUncheckedCreateWithoutReportInput = {
    id?: string;
    userId: string;
    type: $Enums.SanctionType;
    reason: string;
    startsAt?: Date | string;
    endsAt?: Date | string | null;
    issuedById: string;
    revokedAt?: Date | string | null;
    revokedById?: string | null;
    createdAt?: Date | string;
};
export type SanctionCreateOrConnectWithoutReportInput = {
    where: Prisma.SanctionWhereUniqueInput;
    create: Prisma.XOR<Prisma.SanctionCreateWithoutReportInput, Prisma.SanctionUncheckedCreateWithoutReportInput>;
};
export type SanctionCreateManyReportInputEnvelope = {
    data: Prisma.SanctionCreateManyReportInput | Prisma.SanctionCreateManyReportInput[];
    skipDuplicates?: boolean;
};
export type SanctionUpsertWithWhereUniqueWithoutReportInput = {
    where: Prisma.SanctionWhereUniqueInput;
    update: Prisma.XOR<Prisma.SanctionUpdateWithoutReportInput, Prisma.SanctionUncheckedUpdateWithoutReportInput>;
    create: Prisma.XOR<Prisma.SanctionCreateWithoutReportInput, Prisma.SanctionUncheckedCreateWithoutReportInput>;
};
export type SanctionUpdateWithWhereUniqueWithoutReportInput = {
    where: Prisma.SanctionWhereUniqueInput;
    data: Prisma.XOR<Prisma.SanctionUpdateWithoutReportInput, Prisma.SanctionUncheckedUpdateWithoutReportInput>;
};
export type SanctionUpdateManyWithWhereWithoutReportInput = {
    where: Prisma.SanctionScalarWhereInput;
    data: Prisma.XOR<Prisma.SanctionUpdateManyMutationInput, Prisma.SanctionUncheckedUpdateManyWithoutReportInput>;
};
export type SanctionCreateManyUserInput = {
    id?: string;
    type: $Enums.SanctionType;
    reason: string;
    startsAt?: Date | string;
    endsAt?: Date | string | null;
    issuedById: string;
    reportId?: string | null;
    revokedAt?: Date | string | null;
    revokedById?: string | null;
    createdAt?: Date | string;
};
export type SanctionCreateManyIssuedByInput = {
    id?: string;
    userId: string;
    type: $Enums.SanctionType;
    reason: string;
    startsAt?: Date | string;
    endsAt?: Date | string | null;
    reportId?: string | null;
    revokedAt?: Date | string | null;
    revokedById?: string | null;
    createdAt?: Date | string;
};
export type SanctionCreateManyRevokedByInput = {
    id?: string;
    userId: string;
    type: $Enums.SanctionType;
    reason: string;
    startsAt?: Date | string;
    endsAt?: Date | string | null;
    issuedById: string;
    reportId?: string | null;
    revokedAt?: Date | string | null;
    createdAt?: Date | string;
};
export type SanctionUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumSanctionTypeFieldUpdateOperationsInput | $Enums.SanctionType;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    revokedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    issuedBy?: Prisma.UserUpdateOneRequiredWithoutSanctionsIssuedNestedInput;
    revokedBy?: Prisma.UserUpdateOneWithoutSanctionsRevokedNestedInput;
    report?: Prisma.ReportUpdateOneWithoutSanctionsNestedInput;
};
export type SanctionUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumSanctionTypeFieldUpdateOperationsInput | $Enums.SanctionType;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    issuedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reportId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    revokedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    revokedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SanctionUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumSanctionTypeFieldUpdateOperationsInput | $Enums.SanctionType;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    issuedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reportId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    revokedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    revokedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SanctionUpdateWithoutIssuedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumSanctionTypeFieldUpdateOperationsInput | $Enums.SanctionType;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    revokedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutSanctionsReceivedNestedInput;
    revokedBy?: Prisma.UserUpdateOneWithoutSanctionsRevokedNestedInput;
    report?: Prisma.ReportUpdateOneWithoutSanctionsNestedInput;
};
export type SanctionUncheckedUpdateWithoutIssuedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumSanctionTypeFieldUpdateOperationsInput | $Enums.SanctionType;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reportId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    revokedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    revokedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SanctionUncheckedUpdateManyWithoutIssuedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumSanctionTypeFieldUpdateOperationsInput | $Enums.SanctionType;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    reportId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    revokedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    revokedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SanctionUpdateWithoutRevokedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumSanctionTypeFieldUpdateOperationsInput | $Enums.SanctionType;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    revokedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutSanctionsReceivedNestedInput;
    issuedBy?: Prisma.UserUpdateOneRequiredWithoutSanctionsIssuedNestedInput;
    report?: Prisma.ReportUpdateOneWithoutSanctionsNestedInput;
};
export type SanctionUncheckedUpdateWithoutRevokedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumSanctionTypeFieldUpdateOperationsInput | $Enums.SanctionType;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    issuedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reportId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    revokedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SanctionUncheckedUpdateManyWithoutRevokedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumSanctionTypeFieldUpdateOperationsInput | $Enums.SanctionType;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    issuedById?: Prisma.StringFieldUpdateOperationsInput | string;
    reportId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    revokedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SanctionCreateManyReportInput = {
    id?: string;
    userId: string;
    type: $Enums.SanctionType;
    reason: string;
    startsAt?: Date | string;
    endsAt?: Date | string | null;
    issuedById: string;
    revokedAt?: Date | string | null;
    revokedById?: string | null;
    createdAt?: Date | string;
};
export type SanctionUpdateWithoutReportInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumSanctionTypeFieldUpdateOperationsInput | $Enums.SanctionType;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    revokedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutSanctionsReceivedNestedInput;
    issuedBy?: Prisma.UserUpdateOneRequiredWithoutSanctionsIssuedNestedInput;
    revokedBy?: Prisma.UserUpdateOneWithoutSanctionsRevokedNestedInput;
};
export type SanctionUncheckedUpdateWithoutReportInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumSanctionTypeFieldUpdateOperationsInput | $Enums.SanctionType;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    issuedById?: Prisma.StringFieldUpdateOperationsInput | string;
    revokedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    revokedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SanctionUncheckedUpdateManyWithoutReportInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumSanctionTypeFieldUpdateOperationsInput | $Enums.SanctionType;
    reason?: Prisma.StringFieldUpdateOperationsInput | string;
    startsAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endsAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    issuedById?: Prisma.StringFieldUpdateOperationsInput | string;
    revokedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    revokedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SanctionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    reason?: boolean;
    startsAt?: boolean;
    endsAt?: boolean;
    issuedById?: boolean;
    reportId?: boolean;
    revokedAt?: boolean;
    revokedById?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    issuedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    revokedBy?: boolean | Prisma.Sanction$revokedByArgs<ExtArgs>;
    report?: boolean | Prisma.Sanction$reportArgs<ExtArgs>;
}, ExtArgs["result"]["sanction"]>;
export type SanctionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    reason?: boolean;
    startsAt?: boolean;
    endsAt?: boolean;
    issuedById?: boolean;
    reportId?: boolean;
    revokedAt?: boolean;
    revokedById?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    issuedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    revokedBy?: boolean | Prisma.Sanction$revokedByArgs<ExtArgs>;
    report?: boolean | Prisma.Sanction$reportArgs<ExtArgs>;
}, ExtArgs["result"]["sanction"]>;
export type SanctionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    reason?: boolean;
    startsAt?: boolean;
    endsAt?: boolean;
    issuedById?: boolean;
    reportId?: boolean;
    revokedAt?: boolean;
    revokedById?: boolean;
    createdAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    issuedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    revokedBy?: boolean | Prisma.Sanction$revokedByArgs<ExtArgs>;
    report?: boolean | Prisma.Sanction$reportArgs<ExtArgs>;
}, ExtArgs["result"]["sanction"]>;
export type SanctionSelectScalar = {
    id?: boolean;
    userId?: boolean;
    type?: boolean;
    reason?: boolean;
    startsAt?: boolean;
    endsAt?: boolean;
    issuedById?: boolean;
    reportId?: boolean;
    revokedAt?: boolean;
    revokedById?: boolean;
    createdAt?: boolean;
};
export type SanctionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "type" | "reason" | "startsAt" | "endsAt" | "issuedById" | "reportId" | "revokedAt" | "revokedById" | "createdAt", ExtArgs["result"]["sanction"]>;
export type SanctionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    issuedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    revokedBy?: boolean | Prisma.Sanction$revokedByArgs<ExtArgs>;
    report?: boolean | Prisma.Sanction$reportArgs<ExtArgs>;
};
export type SanctionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    issuedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    revokedBy?: boolean | Prisma.Sanction$revokedByArgs<ExtArgs>;
    report?: boolean | Prisma.Sanction$reportArgs<ExtArgs>;
};
export type SanctionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    issuedBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    revokedBy?: boolean | Prisma.Sanction$revokedByArgs<ExtArgs>;
    report?: boolean | Prisma.Sanction$reportArgs<ExtArgs>;
};
export type $SanctionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Sanction";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        issuedBy: Prisma.$UserPayload<ExtArgs>;
        revokedBy: Prisma.$UserPayload<ExtArgs> | null;
        report: Prisma.$ReportPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        type: $Enums.SanctionType;
        reason: string;
        startsAt: Date;
        endsAt: Date | null;
        issuedById: string;
        reportId: string | null;
        revokedAt: Date | null;
        revokedById: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["sanction"]>;
    composites: {};
};
export type SanctionGetPayload<S extends boolean | null | undefined | SanctionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SanctionPayload, S>;
export type SanctionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SanctionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SanctionCountAggregateInputType | true;
};
export interface SanctionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Sanction'];
        meta: {
            name: 'Sanction';
        };
    };
    findUnique<T extends SanctionFindUniqueArgs>(args: Prisma.SelectSubset<T, SanctionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SanctionClient<runtime.Types.Result.GetResult<Prisma.$SanctionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends SanctionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SanctionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SanctionClient<runtime.Types.Result.GetResult<Prisma.$SanctionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends SanctionFindFirstArgs>(args?: Prisma.SelectSubset<T, SanctionFindFirstArgs<ExtArgs>>): Prisma.Prisma__SanctionClient<runtime.Types.Result.GetResult<Prisma.$SanctionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends SanctionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SanctionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SanctionClient<runtime.Types.Result.GetResult<Prisma.$SanctionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends SanctionFindManyArgs>(args?: Prisma.SelectSubset<T, SanctionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SanctionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends SanctionCreateArgs>(args: Prisma.SelectSubset<T, SanctionCreateArgs<ExtArgs>>): Prisma.Prisma__SanctionClient<runtime.Types.Result.GetResult<Prisma.$SanctionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends SanctionCreateManyArgs>(args?: Prisma.SelectSubset<T, SanctionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends SanctionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SanctionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SanctionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends SanctionDeleteArgs>(args: Prisma.SelectSubset<T, SanctionDeleteArgs<ExtArgs>>): Prisma.Prisma__SanctionClient<runtime.Types.Result.GetResult<Prisma.$SanctionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends SanctionUpdateArgs>(args: Prisma.SelectSubset<T, SanctionUpdateArgs<ExtArgs>>): Prisma.Prisma__SanctionClient<runtime.Types.Result.GetResult<Prisma.$SanctionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends SanctionDeleteManyArgs>(args?: Prisma.SelectSubset<T, SanctionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends SanctionUpdateManyArgs>(args: Prisma.SelectSubset<T, SanctionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends SanctionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SanctionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SanctionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends SanctionUpsertArgs>(args: Prisma.SelectSubset<T, SanctionUpsertArgs<ExtArgs>>): Prisma.Prisma__SanctionClient<runtime.Types.Result.GetResult<Prisma.$SanctionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends SanctionCountArgs>(args?: Prisma.Subset<T, SanctionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SanctionCountAggregateOutputType> : number>;
    aggregate<T extends SanctionAggregateArgs>(args: Prisma.Subset<T, SanctionAggregateArgs>): Prisma.PrismaPromise<GetSanctionAggregateType<T>>;
    groupBy<T extends SanctionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SanctionGroupByArgs['orderBy'];
    } : {
        orderBy?: SanctionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SanctionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSanctionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: SanctionFieldRefs;
}
export interface Prisma__SanctionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    issuedBy<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    revokedBy<T extends Prisma.Sanction$revokedByArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Sanction$revokedByArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    report<T extends Prisma.Sanction$reportArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Sanction$reportArgs<ExtArgs>>): Prisma.Prisma__ReportClient<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface SanctionFieldRefs {
    readonly id: Prisma.FieldRef<"Sanction", 'String'>;
    readonly userId: Prisma.FieldRef<"Sanction", 'String'>;
    readonly type: Prisma.FieldRef<"Sanction", 'SanctionType'>;
    readonly reason: Prisma.FieldRef<"Sanction", 'String'>;
    readonly startsAt: Prisma.FieldRef<"Sanction", 'DateTime'>;
    readonly endsAt: Prisma.FieldRef<"Sanction", 'DateTime'>;
    readonly issuedById: Prisma.FieldRef<"Sanction", 'String'>;
    readonly reportId: Prisma.FieldRef<"Sanction", 'String'>;
    readonly revokedAt: Prisma.FieldRef<"Sanction", 'DateTime'>;
    readonly revokedById: Prisma.FieldRef<"Sanction", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Sanction", 'DateTime'>;
}
export type SanctionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SanctionSelect<ExtArgs> | null;
    omit?: Prisma.SanctionOmit<ExtArgs> | null;
    include?: Prisma.SanctionInclude<ExtArgs> | null;
    where: Prisma.SanctionWhereUniqueInput;
};
export type SanctionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SanctionSelect<ExtArgs> | null;
    omit?: Prisma.SanctionOmit<ExtArgs> | null;
    include?: Prisma.SanctionInclude<ExtArgs> | null;
    where: Prisma.SanctionWhereUniqueInput;
};
export type SanctionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SanctionSelect<ExtArgs> | null;
    omit?: Prisma.SanctionOmit<ExtArgs> | null;
    include?: Prisma.SanctionInclude<ExtArgs> | null;
    where?: Prisma.SanctionWhereInput;
    orderBy?: Prisma.SanctionOrderByWithRelationInput | Prisma.SanctionOrderByWithRelationInput[];
    cursor?: Prisma.SanctionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SanctionScalarFieldEnum | Prisma.SanctionScalarFieldEnum[];
};
export type SanctionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SanctionSelect<ExtArgs> | null;
    omit?: Prisma.SanctionOmit<ExtArgs> | null;
    include?: Prisma.SanctionInclude<ExtArgs> | null;
    where?: Prisma.SanctionWhereInput;
    orderBy?: Prisma.SanctionOrderByWithRelationInput | Prisma.SanctionOrderByWithRelationInput[];
    cursor?: Prisma.SanctionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SanctionScalarFieldEnum | Prisma.SanctionScalarFieldEnum[];
};
export type SanctionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SanctionSelect<ExtArgs> | null;
    omit?: Prisma.SanctionOmit<ExtArgs> | null;
    include?: Prisma.SanctionInclude<ExtArgs> | null;
    where?: Prisma.SanctionWhereInput;
    orderBy?: Prisma.SanctionOrderByWithRelationInput | Prisma.SanctionOrderByWithRelationInput[];
    cursor?: Prisma.SanctionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SanctionScalarFieldEnum | Prisma.SanctionScalarFieldEnum[];
};
export type SanctionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SanctionSelect<ExtArgs> | null;
    omit?: Prisma.SanctionOmit<ExtArgs> | null;
    include?: Prisma.SanctionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SanctionCreateInput, Prisma.SanctionUncheckedCreateInput>;
};
export type SanctionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.SanctionCreateManyInput | Prisma.SanctionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SanctionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SanctionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SanctionOmit<ExtArgs> | null;
    data: Prisma.SanctionCreateManyInput | Prisma.SanctionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.SanctionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type SanctionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SanctionSelect<ExtArgs> | null;
    omit?: Prisma.SanctionOmit<ExtArgs> | null;
    include?: Prisma.SanctionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SanctionUpdateInput, Prisma.SanctionUncheckedUpdateInput>;
    where: Prisma.SanctionWhereUniqueInput;
};
export type SanctionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.SanctionUpdateManyMutationInput, Prisma.SanctionUncheckedUpdateManyInput>;
    where?: Prisma.SanctionWhereInput;
    limit?: number;
};
export type SanctionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SanctionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.SanctionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SanctionUpdateManyMutationInput, Prisma.SanctionUncheckedUpdateManyInput>;
    where?: Prisma.SanctionWhereInput;
    limit?: number;
    include?: Prisma.SanctionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type SanctionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SanctionSelect<ExtArgs> | null;
    omit?: Prisma.SanctionOmit<ExtArgs> | null;
    include?: Prisma.SanctionInclude<ExtArgs> | null;
    where: Prisma.SanctionWhereUniqueInput;
    create: Prisma.XOR<Prisma.SanctionCreateInput, Prisma.SanctionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.SanctionUpdateInput, Prisma.SanctionUncheckedUpdateInput>;
};
export type SanctionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SanctionSelect<ExtArgs> | null;
    omit?: Prisma.SanctionOmit<ExtArgs> | null;
    include?: Prisma.SanctionInclude<ExtArgs> | null;
    where: Prisma.SanctionWhereUniqueInput;
};
export type SanctionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SanctionWhereInput;
    limit?: number;
};
export type Sanction$revokedByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
export type Sanction$reportArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportSelect<ExtArgs> | null;
    omit?: Prisma.ReportOmit<ExtArgs> | null;
    include?: Prisma.ReportInclude<ExtArgs> | null;
    where?: Prisma.ReportWhereInput;
};
export type SanctionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SanctionSelect<ExtArgs> | null;
    omit?: Prisma.SanctionOmit<ExtArgs> | null;
    include?: Prisma.SanctionInclude<ExtArgs> | null;
};
