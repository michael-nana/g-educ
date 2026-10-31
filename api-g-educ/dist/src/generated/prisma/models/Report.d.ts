import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ReportModel = runtime.Types.Result.DefaultSelection<Prisma.$ReportPayload>;
export type AggregateReport = {
    _count: ReportCountAggregateOutputType | null;
    _min: ReportMinAggregateOutputType | null;
    _max: ReportMaxAggregateOutputType | null;
};
export type ReportMinAggregateOutputType = {
    id: string | null;
    reporterId: string | null;
    threadId: string | null;
    answerId: string | null;
    contributionId: string | null;
    reason: $Enums.ReportReason | null;
    details: string | null;
    status: $Enums.ReportStatus | null;
    handledById: string | null;
    handledAt: Date | null;
    decisionNote: string | null;
    createdAt: Date | null;
};
export type ReportMaxAggregateOutputType = {
    id: string | null;
    reporterId: string | null;
    threadId: string | null;
    answerId: string | null;
    contributionId: string | null;
    reason: $Enums.ReportReason | null;
    details: string | null;
    status: $Enums.ReportStatus | null;
    handledById: string | null;
    handledAt: Date | null;
    decisionNote: string | null;
    createdAt: Date | null;
};
export type ReportCountAggregateOutputType = {
    id: number;
    reporterId: number;
    threadId: number;
    answerId: number;
    contributionId: number;
    reason: number;
    details: number;
    status: number;
    handledById: number;
    handledAt: number;
    decisionNote: number;
    createdAt: number;
    _all: number;
};
export type ReportMinAggregateInputType = {
    id?: true;
    reporterId?: true;
    threadId?: true;
    answerId?: true;
    contributionId?: true;
    reason?: true;
    details?: true;
    status?: true;
    handledById?: true;
    handledAt?: true;
    decisionNote?: true;
    createdAt?: true;
};
export type ReportMaxAggregateInputType = {
    id?: true;
    reporterId?: true;
    threadId?: true;
    answerId?: true;
    contributionId?: true;
    reason?: true;
    details?: true;
    status?: true;
    handledById?: true;
    handledAt?: true;
    decisionNote?: true;
    createdAt?: true;
};
export type ReportCountAggregateInputType = {
    id?: true;
    reporterId?: true;
    threadId?: true;
    answerId?: true;
    contributionId?: true;
    reason?: true;
    details?: true;
    status?: true;
    handledById?: true;
    handledAt?: true;
    decisionNote?: true;
    createdAt?: true;
    _all?: true;
};
export type ReportAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReportWhereInput;
    orderBy?: Prisma.ReportOrderByWithRelationInput | Prisma.ReportOrderByWithRelationInput[];
    cursor?: Prisma.ReportWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ReportCountAggregateInputType;
    _min?: ReportMinAggregateInputType;
    _max?: ReportMaxAggregateInputType;
};
export type GetReportAggregateType<T extends ReportAggregateArgs> = {
    [P in keyof T & keyof AggregateReport]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateReport[P]> : Prisma.GetScalarType<T[P], AggregateReport[P]>;
};
export type ReportGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReportWhereInput;
    orderBy?: Prisma.ReportOrderByWithAggregationInput | Prisma.ReportOrderByWithAggregationInput[];
    by: Prisma.ReportScalarFieldEnum[] | Prisma.ReportScalarFieldEnum;
    having?: Prisma.ReportScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ReportCountAggregateInputType | true;
    _min?: ReportMinAggregateInputType;
    _max?: ReportMaxAggregateInputType;
};
export type ReportGroupByOutputType = {
    id: string;
    reporterId: string;
    threadId: string | null;
    answerId: string | null;
    contributionId: string | null;
    reason: $Enums.ReportReason;
    details: string | null;
    status: $Enums.ReportStatus;
    handledById: string | null;
    handledAt: Date | null;
    decisionNote: string | null;
    createdAt: Date;
    _count: ReportCountAggregateOutputType | null;
    _min: ReportMinAggregateOutputType | null;
    _max: ReportMaxAggregateOutputType | null;
};
export type GetReportGroupByPayload<T extends ReportGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ReportGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ReportGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ReportGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ReportGroupByOutputType[P]>;
}>>;
export type ReportWhereInput = {
    AND?: Prisma.ReportWhereInput | Prisma.ReportWhereInput[];
    OR?: Prisma.ReportWhereInput[];
    NOT?: Prisma.ReportWhereInput | Prisma.ReportWhereInput[];
    id?: Prisma.UuidFilter<"Report"> | string;
    reporterId?: Prisma.UuidFilter<"Report"> | string;
    threadId?: Prisma.UuidNullableFilter<"Report"> | string | null;
    answerId?: Prisma.UuidNullableFilter<"Report"> | string | null;
    contributionId?: Prisma.UuidNullableFilter<"Report"> | string | null;
    reason?: Prisma.EnumReportReasonFilter<"Report"> | $Enums.ReportReason;
    details?: Prisma.StringNullableFilter<"Report"> | string | null;
    status?: Prisma.EnumReportStatusFilter<"Report"> | $Enums.ReportStatus;
    handledById?: Prisma.UuidNullableFilter<"Report"> | string | null;
    handledAt?: Prisma.DateTimeNullableFilter<"Report"> | Date | string | null;
    decisionNote?: Prisma.StringNullableFilter<"Report"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Report"> | Date | string;
    reporter?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    handledBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    thread?: Prisma.XOR<Prisma.ForumThreadNullableScalarRelationFilter, Prisma.ForumThreadWhereInput> | null;
    answer?: Prisma.XOR<Prisma.ForumAnswerNullableScalarRelationFilter, Prisma.ForumAnswerWhereInput> | null;
    contribution?: Prisma.XOR<Prisma.ContributionNullableScalarRelationFilter, Prisma.ContributionWhereInput> | null;
    sanctions?: Prisma.SanctionListRelationFilter;
};
export type ReportOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    reporterId?: Prisma.SortOrder;
    threadId?: Prisma.SortOrderInput | Prisma.SortOrder;
    answerId?: Prisma.SortOrderInput | Prisma.SortOrder;
    contributionId?: Prisma.SortOrderInput | Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    details?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    handledById?: Prisma.SortOrderInput | Prisma.SortOrder;
    handledAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    decisionNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    reporter?: Prisma.UserOrderByWithRelationInput;
    handledBy?: Prisma.UserOrderByWithRelationInput;
    thread?: Prisma.ForumThreadOrderByWithRelationInput;
    answer?: Prisma.ForumAnswerOrderByWithRelationInput;
    contribution?: Prisma.ContributionOrderByWithRelationInput;
    sanctions?: Prisma.SanctionOrderByRelationAggregateInput;
};
export type ReportWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    reporterId_threadId?: Prisma.ReportReporterIdThreadIdCompoundUniqueInput;
    reporterId_answerId?: Prisma.ReportReporterIdAnswerIdCompoundUniqueInput;
    reporterId_contributionId?: Prisma.ReportReporterIdContributionIdCompoundUniqueInput;
    AND?: Prisma.ReportWhereInput | Prisma.ReportWhereInput[];
    OR?: Prisma.ReportWhereInput[];
    NOT?: Prisma.ReportWhereInput | Prisma.ReportWhereInput[];
    reporterId?: Prisma.UuidFilter<"Report"> | string;
    threadId?: Prisma.UuidNullableFilter<"Report"> | string | null;
    answerId?: Prisma.UuidNullableFilter<"Report"> | string | null;
    contributionId?: Prisma.UuidNullableFilter<"Report"> | string | null;
    reason?: Prisma.EnumReportReasonFilter<"Report"> | $Enums.ReportReason;
    details?: Prisma.StringNullableFilter<"Report"> | string | null;
    status?: Prisma.EnumReportStatusFilter<"Report"> | $Enums.ReportStatus;
    handledById?: Prisma.UuidNullableFilter<"Report"> | string | null;
    handledAt?: Prisma.DateTimeNullableFilter<"Report"> | Date | string | null;
    decisionNote?: Prisma.StringNullableFilter<"Report"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Report"> | Date | string;
    reporter?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    handledBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    thread?: Prisma.XOR<Prisma.ForumThreadNullableScalarRelationFilter, Prisma.ForumThreadWhereInput> | null;
    answer?: Prisma.XOR<Prisma.ForumAnswerNullableScalarRelationFilter, Prisma.ForumAnswerWhereInput> | null;
    contribution?: Prisma.XOR<Prisma.ContributionNullableScalarRelationFilter, Prisma.ContributionWhereInput> | null;
    sanctions?: Prisma.SanctionListRelationFilter;
}, "id" | "reporterId_threadId" | "reporterId_answerId" | "reporterId_contributionId">;
export type ReportOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    reporterId?: Prisma.SortOrder;
    threadId?: Prisma.SortOrderInput | Prisma.SortOrder;
    answerId?: Prisma.SortOrderInput | Prisma.SortOrder;
    contributionId?: Prisma.SortOrderInput | Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    details?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    handledById?: Prisma.SortOrderInput | Prisma.SortOrder;
    handledAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    decisionNote?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ReportCountOrderByAggregateInput;
    _max?: Prisma.ReportMaxOrderByAggregateInput;
    _min?: Prisma.ReportMinOrderByAggregateInput;
};
export type ReportScalarWhereWithAggregatesInput = {
    AND?: Prisma.ReportScalarWhereWithAggregatesInput | Prisma.ReportScalarWhereWithAggregatesInput[];
    OR?: Prisma.ReportScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ReportScalarWhereWithAggregatesInput | Prisma.ReportScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Report"> | string;
    reporterId?: Prisma.UuidWithAggregatesFilter<"Report"> | string;
    threadId?: Prisma.UuidNullableWithAggregatesFilter<"Report"> | string | null;
    answerId?: Prisma.UuidNullableWithAggregatesFilter<"Report"> | string | null;
    contributionId?: Prisma.UuidNullableWithAggregatesFilter<"Report"> | string | null;
    reason?: Prisma.EnumReportReasonWithAggregatesFilter<"Report"> | $Enums.ReportReason;
    details?: Prisma.StringNullableWithAggregatesFilter<"Report"> | string | null;
    status?: Prisma.EnumReportStatusWithAggregatesFilter<"Report"> | $Enums.ReportStatus;
    handledById?: Prisma.UuidNullableWithAggregatesFilter<"Report"> | string | null;
    handledAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Report"> | Date | string | null;
    decisionNote?: Prisma.StringNullableWithAggregatesFilter<"Report"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Report"> | Date | string;
};
export type ReportCreateInput = {
    id?: string;
    reason: $Enums.ReportReason;
    details?: string | null;
    status?: $Enums.ReportStatus;
    handledAt?: Date | string | null;
    decisionNote?: string | null;
    createdAt?: Date | string;
    reporter: Prisma.UserCreateNestedOneWithoutReportsMadeInput;
    handledBy?: Prisma.UserCreateNestedOneWithoutReportsHandledInput;
    thread?: Prisma.ForumThreadCreateNestedOneWithoutReportsInput;
    answer?: Prisma.ForumAnswerCreateNestedOneWithoutReportsInput;
    contribution?: Prisma.ContributionCreateNestedOneWithoutReportsInput;
    sanctions?: Prisma.SanctionCreateNestedManyWithoutReportInput;
};
export type ReportUncheckedCreateInput = {
    id?: string;
    reporterId: string;
    threadId?: string | null;
    answerId?: string | null;
    contributionId?: string | null;
    reason: $Enums.ReportReason;
    details?: string | null;
    status?: $Enums.ReportStatus;
    handledById?: string | null;
    handledAt?: Date | string | null;
    decisionNote?: string | null;
    createdAt?: Date | string;
    sanctions?: Prisma.SanctionUncheckedCreateNestedManyWithoutReportInput;
};
export type ReportUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.EnumReportReasonFieldUpdateOperationsInput | $Enums.ReportReason;
    details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus;
    handledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decisionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reporter?: Prisma.UserUpdateOneRequiredWithoutReportsMadeNestedInput;
    handledBy?: Prisma.UserUpdateOneWithoutReportsHandledNestedInput;
    thread?: Prisma.ForumThreadUpdateOneWithoutReportsNestedInput;
    answer?: Prisma.ForumAnswerUpdateOneWithoutReportsNestedInput;
    contribution?: Prisma.ContributionUpdateOneWithoutReportsNestedInput;
    sanctions?: Prisma.SanctionUpdateManyWithoutReportNestedInput;
};
export type ReportUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reporterId?: Prisma.StringFieldUpdateOperationsInput | string;
    threadId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    answerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contributionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.EnumReportReasonFieldUpdateOperationsInput | $Enums.ReportReason;
    details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus;
    handledById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    handledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decisionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sanctions?: Prisma.SanctionUncheckedUpdateManyWithoutReportNestedInput;
};
export type ReportCreateManyInput = {
    id?: string;
    reporterId: string;
    threadId?: string | null;
    answerId?: string | null;
    contributionId?: string | null;
    reason: $Enums.ReportReason;
    details?: string | null;
    status?: $Enums.ReportStatus;
    handledById?: string | null;
    handledAt?: Date | string | null;
    decisionNote?: string | null;
    createdAt?: Date | string;
};
export type ReportUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.EnumReportReasonFieldUpdateOperationsInput | $Enums.ReportReason;
    details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus;
    handledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decisionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReportUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reporterId?: Prisma.StringFieldUpdateOperationsInput | string;
    threadId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    answerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contributionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.EnumReportReasonFieldUpdateOperationsInput | $Enums.ReportReason;
    details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus;
    handledById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    handledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decisionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReportListRelationFilter = {
    every?: Prisma.ReportWhereInput;
    some?: Prisma.ReportWhereInput;
    none?: Prisma.ReportWhereInput;
};
export type ReportOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ReportReporterIdThreadIdCompoundUniqueInput = {
    reporterId: string;
    threadId: string;
};
export type ReportReporterIdAnswerIdCompoundUniqueInput = {
    reporterId: string;
    answerId: string;
};
export type ReportReporterIdContributionIdCompoundUniqueInput = {
    reporterId: string;
    contributionId: string;
};
export type ReportCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    reporterId?: Prisma.SortOrder;
    threadId?: Prisma.SortOrder;
    answerId?: Prisma.SortOrder;
    contributionId?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    details?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    handledById?: Prisma.SortOrder;
    handledAt?: Prisma.SortOrder;
    decisionNote?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ReportMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    reporterId?: Prisma.SortOrder;
    threadId?: Prisma.SortOrder;
    answerId?: Prisma.SortOrder;
    contributionId?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    details?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    handledById?: Prisma.SortOrder;
    handledAt?: Prisma.SortOrder;
    decisionNote?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ReportMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    reporterId?: Prisma.SortOrder;
    threadId?: Prisma.SortOrder;
    answerId?: Prisma.SortOrder;
    contributionId?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    details?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    handledById?: Prisma.SortOrder;
    handledAt?: Prisma.SortOrder;
    decisionNote?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ReportNullableScalarRelationFilter = {
    is?: Prisma.ReportWhereInput | null;
    isNot?: Prisma.ReportWhereInput | null;
};
export type ReportCreateNestedManyWithoutReporterInput = {
    create?: Prisma.XOR<Prisma.ReportCreateWithoutReporterInput, Prisma.ReportUncheckedCreateWithoutReporterInput> | Prisma.ReportCreateWithoutReporterInput[] | Prisma.ReportUncheckedCreateWithoutReporterInput[];
    connectOrCreate?: Prisma.ReportCreateOrConnectWithoutReporterInput | Prisma.ReportCreateOrConnectWithoutReporterInput[];
    createMany?: Prisma.ReportCreateManyReporterInputEnvelope;
    connect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
};
export type ReportCreateNestedManyWithoutHandledByInput = {
    create?: Prisma.XOR<Prisma.ReportCreateWithoutHandledByInput, Prisma.ReportUncheckedCreateWithoutHandledByInput> | Prisma.ReportCreateWithoutHandledByInput[] | Prisma.ReportUncheckedCreateWithoutHandledByInput[];
    connectOrCreate?: Prisma.ReportCreateOrConnectWithoutHandledByInput | Prisma.ReportCreateOrConnectWithoutHandledByInput[];
    createMany?: Prisma.ReportCreateManyHandledByInputEnvelope;
    connect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
};
export type ReportUncheckedCreateNestedManyWithoutReporterInput = {
    create?: Prisma.XOR<Prisma.ReportCreateWithoutReporterInput, Prisma.ReportUncheckedCreateWithoutReporterInput> | Prisma.ReportCreateWithoutReporterInput[] | Prisma.ReportUncheckedCreateWithoutReporterInput[];
    connectOrCreate?: Prisma.ReportCreateOrConnectWithoutReporterInput | Prisma.ReportCreateOrConnectWithoutReporterInput[];
    createMany?: Prisma.ReportCreateManyReporterInputEnvelope;
    connect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
};
export type ReportUncheckedCreateNestedManyWithoutHandledByInput = {
    create?: Prisma.XOR<Prisma.ReportCreateWithoutHandledByInput, Prisma.ReportUncheckedCreateWithoutHandledByInput> | Prisma.ReportCreateWithoutHandledByInput[] | Prisma.ReportUncheckedCreateWithoutHandledByInput[];
    connectOrCreate?: Prisma.ReportCreateOrConnectWithoutHandledByInput | Prisma.ReportCreateOrConnectWithoutHandledByInput[];
    createMany?: Prisma.ReportCreateManyHandledByInputEnvelope;
    connect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
};
export type ReportUpdateManyWithoutReporterNestedInput = {
    create?: Prisma.XOR<Prisma.ReportCreateWithoutReporterInput, Prisma.ReportUncheckedCreateWithoutReporterInput> | Prisma.ReportCreateWithoutReporterInput[] | Prisma.ReportUncheckedCreateWithoutReporterInput[];
    connectOrCreate?: Prisma.ReportCreateOrConnectWithoutReporterInput | Prisma.ReportCreateOrConnectWithoutReporterInput[];
    upsert?: Prisma.ReportUpsertWithWhereUniqueWithoutReporterInput | Prisma.ReportUpsertWithWhereUniqueWithoutReporterInput[];
    createMany?: Prisma.ReportCreateManyReporterInputEnvelope;
    set?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    disconnect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    delete?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    connect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    update?: Prisma.ReportUpdateWithWhereUniqueWithoutReporterInput | Prisma.ReportUpdateWithWhereUniqueWithoutReporterInput[];
    updateMany?: Prisma.ReportUpdateManyWithWhereWithoutReporterInput | Prisma.ReportUpdateManyWithWhereWithoutReporterInput[];
    deleteMany?: Prisma.ReportScalarWhereInput | Prisma.ReportScalarWhereInput[];
};
export type ReportUpdateManyWithoutHandledByNestedInput = {
    create?: Prisma.XOR<Prisma.ReportCreateWithoutHandledByInput, Prisma.ReportUncheckedCreateWithoutHandledByInput> | Prisma.ReportCreateWithoutHandledByInput[] | Prisma.ReportUncheckedCreateWithoutHandledByInput[];
    connectOrCreate?: Prisma.ReportCreateOrConnectWithoutHandledByInput | Prisma.ReportCreateOrConnectWithoutHandledByInput[];
    upsert?: Prisma.ReportUpsertWithWhereUniqueWithoutHandledByInput | Prisma.ReportUpsertWithWhereUniqueWithoutHandledByInput[];
    createMany?: Prisma.ReportCreateManyHandledByInputEnvelope;
    set?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    disconnect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    delete?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    connect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    update?: Prisma.ReportUpdateWithWhereUniqueWithoutHandledByInput | Prisma.ReportUpdateWithWhereUniqueWithoutHandledByInput[];
    updateMany?: Prisma.ReportUpdateManyWithWhereWithoutHandledByInput | Prisma.ReportUpdateManyWithWhereWithoutHandledByInput[];
    deleteMany?: Prisma.ReportScalarWhereInput | Prisma.ReportScalarWhereInput[];
};
export type ReportUncheckedUpdateManyWithoutReporterNestedInput = {
    create?: Prisma.XOR<Prisma.ReportCreateWithoutReporterInput, Prisma.ReportUncheckedCreateWithoutReporterInput> | Prisma.ReportCreateWithoutReporterInput[] | Prisma.ReportUncheckedCreateWithoutReporterInput[];
    connectOrCreate?: Prisma.ReportCreateOrConnectWithoutReporterInput | Prisma.ReportCreateOrConnectWithoutReporterInput[];
    upsert?: Prisma.ReportUpsertWithWhereUniqueWithoutReporterInput | Prisma.ReportUpsertWithWhereUniqueWithoutReporterInput[];
    createMany?: Prisma.ReportCreateManyReporterInputEnvelope;
    set?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    disconnect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    delete?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    connect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    update?: Prisma.ReportUpdateWithWhereUniqueWithoutReporterInput | Prisma.ReportUpdateWithWhereUniqueWithoutReporterInput[];
    updateMany?: Prisma.ReportUpdateManyWithWhereWithoutReporterInput | Prisma.ReportUpdateManyWithWhereWithoutReporterInput[];
    deleteMany?: Prisma.ReportScalarWhereInput | Prisma.ReportScalarWhereInput[];
};
export type ReportUncheckedUpdateManyWithoutHandledByNestedInput = {
    create?: Prisma.XOR<Prisma.ReportCreateWithoutHandledByInput, Prisma.ReportUncheckedCreateWithoutHandledByInput> | Prisma.ReportCreateWithoutHandledByInput[] | Prisma.ReportUncheckedCreateWithoutHandledByInput[];
    connectOrCreate?: Prisma.ReportCreateOrConnectWithoutHandledByInput | Prisma.ReportCreateOrConnectWithoutHandledByInput[];
    upsert?: Prisma.ReportUpsertWithWhereUniqueWithoutHandledByInput | Prisma.ReportUpsertWithWhereUniqueWithoutHandledByInput[];
    createMany?: Prisma.ReportCreateManyHandledByInputEnvelope;
    set?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    disconnect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    delete?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    connect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    update?: Prisma.ReportUpdateWithWhereUniqueWithoutHandledByInput | Prisma.ReportUpdateWithWhereUniqueWithoutHandledByInput[];
    updateMany?: Prisma.ReportUpdateManyWithWhereWithoutHandledByInput | Prisma.ReportUpdateManyWithWhereWithoutHandledByInput[];
    deleteMany?: Prisma.ReportScalarWhereInput | Prisma.ReportScalarWhereInput[];
};
export type ReportCreateNestedManyWithoutContributionInput = {
    create?: Prisma.XOR<Prisma.ReportCreateWithoutContributionInput, Prisma.ReportUncheckedCreateWithoutContributionInput> | Prisma.ReportCreateWithoutContributionInput[] | Prisma.ReportUncheckedCreateWithoutContributionInput[];
    connectOrCreate?: Prisma.ReportCreateOrConnectWithoutContributionInput | Prisma.ReportCreateOrConnectWithoutContributionInput[];
    createMany?: Prisma.ReportCreateManyContributionInputEnvelope;
    connect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
};
export type ReportUncheckedCreateNestedManyWithoutContributionInput = {
    create?: Prisma.XOR<Prisma.ReportCreateWithoutContributionInput, Prisma.ReportUncheckedCreateWithoutContributionInput> | Prisma.ReportCreateWithoutContributionInput[] | Prisma.ReportUncheckedCreateWithoutContributionInput[];
    connectOrCreate?: Prisma.ReportCreateOrConnectWithoutContributionInput | Prisma.ReportCreateOrConnectWithoutContributionInput[];
    createMany?: Prisma.ReportCreateManyContributionInputEnvelope;
    connect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
};
export type ReportUpdateManyWithoutContributionNestedInput = {
    create?: Prisma.XOR<Prisma.ReportCreateWithoutContributionInput, Prisma.ReportUncheckedCreateWithoutContributionInput> | Prisma.ReportCreateWithoutContributionInput[] | Prisma.ReportUncheckedCreateWithoutContributionInput[];
    connectOrCreate?: Prisma.ReportCreateOrConnectWithoutContributionInput | Prisma.ReportCreateOrConnectWithoutContributionInput[];
    upsert?: Prisma.ReportUpsertWithWhereUniqueWithoutContributionInput | Prisma.ReportUpsertWithWhereUniqueWithoutContributionInput[];
    createMany?: Prisma.ReportCreateManyContributionInputEnvelope;
    set?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    disconnect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    delete?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    connect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    update?: Prisma.ReportUpdateWithWhereUniqueWithoutContributionInput | Prisma.ReportUpdateWithWhereUniqueWithoutContributionInput[];
    updateMany?: Prisma.ReportUpdateManyWithWhereWithoutContributionInput | Prisma.ReportUpdateManyWithWhereWithoutContributionInput[];
    deleteMany?: Prisma.ReportScalarWhereInput | Prisma.ReportScalarWhereInput[];
};
export type ReportUncheckedUpdateManyWithoutContributionNestedInput = {
    create?: Prisma.XOR<Prisma.ReportCreateWithoutContributionInput, Prisma.ReportUncheckedCreateWithoutContributionInput> | Prisma.ReportCreateWithoutContributionInput[] | Prisma.ReportUncheckedCreateWithoutContributionInput[];
    connectOrCreate?: Prisma.ReportCreateOrConnectWithoutContributionInput | Prisma.ReportCreateOrConnectWithoutContributionInput[];
    upsert?: Prisma.ReportUpsertWithWhereUniqueWithoutContributionInput | Prisma.ReportUpsertWithWhereUniqueWithoutContributionInput[];
    createMany?: Prisma.ReportCreateManyContributionInputEnvelope;
    set?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    disconnect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    delete?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    connect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    update?: Prisma.ReportUpdateWithWhereUniqueWithoutContributionInput | Prisma.ReportUpdateWithWhereUniqueWithoutContributionInput[];
    updateMany?: Prisma.ReportUpdateManyWithWhereWithoutContributionInput | Prisma.ReportUpdateManyWithWhereWithoutContributionInput[];
    deleteMany?: Prisma.ReportScalarWhereInput | Prisma.ReportScalarWhereInput[];
};
export type ReportCreateNestedManyWithoutThreadInput = {
    create?: Prisma.XOR<Prisma.ReportCreateWithoutThreadInput, Prisma.ReportUncheckedCreateWithoutThreadInput> | Prisma.ReportCreateWithoutThreadInput[] | Prisma.ReportUncheckedCreateWithoutThreadInput[];
    connectOrCreate?: Prisma.ReportCreateOrConnectWithoutThreadInput | Prisma.ReportCreateOrConnectWithoutThreadInput[];
    createMany?: Prisma.ReportCreateManyThreadInputEnvelope;
    connect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
};
export type ReportUncheckedCreateNestedManyWithoutThreadInput = {
    create?: Prisma.XOR<Prisma.ReportCreateWithoutThreadInput, Prisma.ReportUncheckedCreateWithoutThreadInput> | Prisma.ReportCreateWithoutThreadInput[] | Prisma.ReportUncheckedCreateWithoutThreadInput[];
    connectOrCreate?: Prisma.ReportCreateOrConnectWithoutThreadInput | Prisma.ReportCreateOrConnectWithoutThreadInput[];
    createMany?: Prisma.ReportCreateManyThreadInputEnvelope;
    connect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
};
export type ReportUpdateManyWithoutThreadNestedInput = {
    create?: Prisma.XOR<Prisma.ReportCreateWithoutThreadInput, Prisma.ReportUncheckedCreateWithoutThreadInput> | Prisma.ReportCreateWithoutThreadInput[] | Prisma.ReportUncheckedCreateWithoutThreadInput[];
    connectOrCreate?: Prisma.ReportCreateOrConnectWithoutThreadInput | Prisma.ReportCreateOrConnectWithoutThreadInput[];
    upsert?: Prisma.ReportUpsertWithWhereUniqueWithoutThreadInput | Prisma.ReportUpsertWithWhereUniqueWithoutThreadInput[];
    createMany?: Prisma.ReportCreateManyThreadInputEnvelope;
    set?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    disconnect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    delete?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    connect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    update?: Prisma.ReportUpdateWithWhereUniqueWithoutThreadInput | Prisma.ReportUpdateWithWhereUniqueWithoutThreadInput[];
    updateMany?: Prisma.ReportUpdateManyWithWhereWithoutThreadInput | Prisma.ReportUpdateManyWithWhereWithoutThreadInput[];
    deleteMany?: Prisma.ReportScalarWhereInput | Prisma.ReportScalarWhereInput[];
};
export type ReportUncheckedUpdateManyWithoutThreadNestedInput = {
    create?: Prisma.XOR<Prisma.ReportCreateWithoutThreadInput, Prisma.ReportUncheckedCreateWithoutThreadInput> | Prisma.ReportCreateWithoutThreadInput[] | Prisma.ReportUncheckedCreateWithoutThreadInput[];
    connectOrCreate?: Prisma.ReportCreateOrConnectWithoutThreadInput | Prisma.ReportCreateOrConnectWithoutThreadInput[];
    upsert?: Prisma.ReportUpsertWithWhereUniqueWithoutThreadInput | Prisma.ReportUpsertWithWhereUniqueWithoutThreadInput[];
    createMany?: Prisma.ReportCreateManyThreadInputEnvelope;
    set?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    disconnect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    delete?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    connect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    update?: Prisma.ReportUpdateWithWhereUniqueWithoutThreadInput | Prisma.ReportUpdateWithWhereUniqueWithoutThreadInput[];
    updateMany?: Prisma.ReportUpdateManyWithWhereWithoutThreadInput | Prisma.ReportUpdateManyWithWhereWithoutThreadInput[];
    deleteMany?: Prisma.ReportScalarWhereInput | Prisma.ReportScalarWhereInput[];
};
export type ReportCreateNestedManyWithoutAnswerInput = {
    create?: Prisma.XOR<Prisma.ReportCreateWithoutAnswerInput, Prisma.ReportUncheckedCreateWithoutAnswerInput> | Prisma.ReportCreateWithoutAnswerInput[] | Prisma.ReportUncheckedCreateWithoutAnswerInput[];
    connectOrCreate?: Prisma.ReportCreateOrConnectWithoutAnswerInput | Prisma.ReportCreateOrConnectWithoutAnswerInput[];
    createMany?: Prisma.ReportCreateManyAnswerInputEnvelope;
    connect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
};
export type ReportUncheckedCreateNestedManyWithoutAnswerInput = {
    create?: Prisma.XOR<Prisma.ReportCreateWithoutAnswerInput, Prisma.ReportUncheckedCreateWithoutAnswerInput> | Prisma.ReportCreateWithoutAnswerInput[] | Prisma.ReportUncheckedCreateWithoutAnswerInput[];
    connectOrCreate?: Prisma.ReportCreateOrConnectWithoutAnswerInput | Prisma.ReportCreateOrConnectWithoutAnswerInput[];
    createMany?: Prisma.ReportCreateManyAnswerInputEnvelope;
    connect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
};
export type ReportUpdateManyWithoutAnswerNestedInput = {
    create?: Prisma.XOR<Prisma.ReportCreateWithoutAnswerInput, Prisma.ReportUncheckedCreateWithoutAnswerInput> | Prisma.ReportCreateWithoutAnswerInput[] | Prisma.ReportUncheckedCreateWithoutAnswerInput[];
    connectOrCreate?: Prisma.ReportCreateOrConnectWithoutAnswerInput | Prisma.ReportCreateOrConnectWithoutAnswerInput[];
    upsert?: Prisma.ReportUpsertWithWhereUniqueWithoutAnswerInput | Prisma.ReportUpsertWithWhereUniqueWithoutAnswerInput[];
    createMany?: Prisma.ReportCreateManyAnswerInputEnvelope;
    set?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    disconnect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    delete?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    connect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    update?: Prisma.ReportUpdateWithWhereUniqueWithoutAnswerInput | Prisma.ReportUpdateWithWhereUniqueWithoutAnswerInput[];
    updateMany?: Prisma.ReportUpdateManyWithWhereWithoutAnswerInput | Prisma.ReportUpdateManyWithWhereWithoutAnswerInput[];
    deleteMany?: Prisma.ReportScalarWhereInput | Prisma.ReportScalarWhereInput[];
};
export type ReportUncheckedUpdateManyWithoutAnswerNestedInput = {
    create?: Prisma.XOR<Prisma.ReportCreateWithoutAnswerInput, Prisma.ReportUncheckedCreateWithoutAnswerInput> | Prisma.ReportCreateWithoutAnswerInput[] | Prisma.ReportUncheckedCreateWithoutAnswerInput[];
    connectOrCreate?: Prisma.ReportCreateOrConnectWithoutAnswerInput | Prisma.ReportCreateOrConnectWithoutAnswerInput[];
    upsert?: Prisma.ReportUpsertWithWhereUniqueWithoutAnswerInput | Prisma.ReportUpsertWithWhereUniqueWithoutAnswerInput[];
    createMany?: Prisma.ReportCreateManyAnswerInputEnvelope;
    set?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    disconnect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    delete?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    connect?: Prisma.ReportWhereUniqueInput | Prisma.ReportWhereUniqueInput[];
    update?: Prisma.ReportUpdateWithWhereUniqueWithoutAnswerInput | Prisma.ReportUpdateWithWhereUniqueWithoutAnswerInput[];
    updateMany?: Prisma.ReportUpdateManyWithWhereWithoutAnswerInput | Prisma.ReportUpdateManyWithWhereWithoutAnswerInput[];
    deleteMany?: Prisma.ReportScalarWhereInput | Prisma.ReportScalarWhereInput[];
};
export type EnumReportReasonFieldUpdateOperationsInput = {
    set?: $Enums.ReportReason;
};
export type EnumReportStatusFieldUpdateOperationsInput = {
    set?: $Enums.ReportStatus;
};
export type ReportCreateNestedOneWithoutSanctionsInput = {
    create?: Prisma.XOR<Prisma.ReportCreateWithoutSanctionsInput, Prisma.ReportUncheckedCreateWithoutSanctionsInput>;
    connectOrCreate?: Prisma.ReportCreateOrConnectWithoutSanctionsInput;
    connect?: Prisma.ReportWhereUniqueInput;
};
export type ReportUpdateOneWithoutSanctionsNestedInput = {
    create?: Prisma.XOR<Prisma.ReportCreateWithoutSanctionsInput, Prisma.ReportUncheckedCreateWithoutSanctionsInput>;
    connectOrCreate?: Prisma.ReportCreateOrConnectWithoutSanctionsInput;
    upsert?: Prisma.ReportUpsertWithoutSanctionsInput;
    disconnect?: Prisma.ReportWhereInput | boolean;
    delete?: Prisma.ReportWhereInput | boolean;
    connect?: Prisma.ReportWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ReportUpdateToOneWithWhereWithoutSanctionsInput, Prisma.ReportUpdateWithoutSanctionsInput>, Prisma.ReportUncheckedUpdateWithoutSanctionsInput>;
};
export type ReportCreateWithoutReporterInput = {
    id?: string;
    reason: $Enums.ReportReason;
    details?: string | null;
    status?: $Enums.ReportStatus;
    handledAt?: Date | string | null;
    decisionNote?: string | null;
    createdAt?: Date | string;
    handledBy?: Prisma.UserCreateNestedOneWithoutReportsHandledInput;
    thread?: Prisma.ForumThreadCreateNestedOneWithoutReportsInput;
    answer?: Prisma.ForumAnswerCreateNestedOneWithoutReportsInput;
    contribution?: Prisma.ContributionCreateNestedOneWithoutReportsInput;
    sanctions?: Prisma.SanctionCreateNestedManyWithoutReportInput;
};
export type ReportUncheckedCreateWithoutReporterInput = {
    id?: string;
    threadId?: string | null;
    answerId?: string | null;
    contributionId?: string | null;
    reason: $Enums.ReportReason;
    details?: string | null;
    status?: $Enums.ReportStatus;
    handledById?: string | null;
    handledAt?: Date | string | null;
    decisionNote?: string | null;
    createdAt?: Date | string;
    sanctions?: Prisma.SanctionUncheckedCreateNestedManyWithoutReportInput;
};
export type ReportCreateOrConnectWithoutReporterInput = {
    where: Prisma.ReportWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReportCreateWithoutReporterInput, Prisma.ReportUncheckedCreateWithoutReporterInput>;
};
export type ReportCreateManyReporterInputEnvelope = {
    data: Prisma.ReportCreateManyReporterInput | Prisma.ReportCreateManyReporterInput[];
    skipDuplicates?: boolean;
};
export type ReportCreateWithoutHandledByInput = {
    id?: string;
    reason: $Enums.ReportReason;
    details?: string | null;
    status?: $Enums.ReportStatus;
    handledAt?: Date | string | null;
    decisionNote?: string | null;
    createdAt?: Date | string;
    reporter: Prisma.UserCreateNestedOneWithoutReportsMadeInput;
    thread?: Prisma.ForumThreadCreateNestedOneWithoutReportsInput;
    answer?: Prisma.ForumAnswerCreateNestedOneWithoutReportsInput;
    contribution?: Prisma.ContributionCreateNestedOneWithoutReportsInput;
    sanctions?: Prisma.SanctionCreateNestedManyWithoutReportInput;
};
export type ReportUncheckedCreateWithoutHandledByInput = {
    id?: string;
    reporterId: string;
    threadId?: string | null;
    answerId?: string | null;
    contributionId?: string | null;
    reason: $Enums.ReportReason;
    details?: string | null;
    status?: $Enums.ReportStatus;
    handledAt?: Date | string | null;
    decisionNote?: string | null;
    createdAt?: Date | string;
    sanctions?: Prisma.SanctionUncheckedCreateNestedManyWithoutReportInput;
};
export type ReportCreateOrConnectWithoutHandledByInput = {
    where: Prisma.ReportWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReportCreateWithoutHandledByInput, Prisma.ReportUncheckedCreateWithoutHandledByInput>;
};
export type ReportCreateManyHandledByInputEnvelope = {
    data: Prisma.ReportCreateManyHandledByInput | Prisma.ReportCreateManyHandledByInput[];
    skipDuplicates?: boolean;
};
export type ReportUpsertWithWhereUniqueWithoutReporterInput = {
    where: Prisma.ReportWhereUniqueInput;
    update: Prisma.XOR<Prisma.ReportUpdateWithoutReporterInput, Prisma.ReportUncheckedUpdateWithoutReporterInput>;
    create: Prisma.XOR<Prisma.ReportCreateWithoutReporterInput, Prisma.ReportUncheckedCreateWithoutReporterInput>;
};
export type ReportUpdateWithWhereUniqueWithoutReporterInput = {
    where: Prisma.ReportWhereUniqueInput;
    data: Prisma.XOR<Prisma.ReportUpdateWithoutReporterInput, Prisma.ReportUncheckedUpdateWithoutReporterInput>;
};
export type ReportUpdateManyWithWhereWithoutReporterInput = {
    where: Prisma.ReportScalarWhereInput;
    data: Prisma.XOR<Prisma.ReportUpdateManyMutationInput, Prisma.ReportUncheckedUpdateManyWithoutReporterInput>;
};
export type ReportScalarWhereInput = {
    AND?: Prisma.ReportScalarWhereInput | Prisma.ReportScalarWhereInput[];
    OR?: Prisma.ReportScalarWhereInput[];
    NOT?: Prisma.ReportScalarWhereInput | Prisma.ReportScalarWhereInput[];
    id?: Prisma.UuidFilter<"Report"> | string;
    reporterId?: Prisma.UuidFilter<"Report"> | string;
    threadId?: Prisma.UuidNullableFilter<"Report"> | string | null;
    answerId?: Prisma.UuidNullableFilter<"Report"> | string | null;
    contributionId?: Prisma.UuidNullableFilter<"Report"> | string | null;
    reason?: Prisma.EnumReportReasonFilter<"Report"> | $Enums.ReportReason;
    details?: Prisma.StringNullableFilter<"Report"> | string | null;
    status?: Prisma.EnumReportStatusFilter<"Report"> | $Enums.ReportStatus;
    handledById?: Prisma.UuidNullableFilter<"Report"> | string | null;
    handledAt?: Prisma.DateTimeNullableFilter<"Report"> | Date | string | null;
    decisionNote?: Prisma.StringNullableFilter<"Report"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Report"> | Date | string;
};
export type ReportUpsertWithWhereUniqueWithoutHandledByInput = {
    where: Prisma.ReportWhereUniqueInput;
    update: Prisma.XOR<Prisma.ReportUpdateWithoutHandledByInput, Prisma.ReportUncheckedUpdateWithoutHandledByInput>;
    create: Prisma.XOR<Prisma.ReportCreateWithoutHandledByInput, Prisma.ReportUncheckedCreateWithoutHandledByInput>;
};
export type ReportUpdateWithWhereUniqueWithoutHandledByInput = {
    where: Prisma.ReportWhereUniqueInput;
    data: Prisma.XOR<Prisma.ReportUpdateWithoutHandledByInput, Prisma.ReportUncheckedUpdateWithoutHandledByInput>;
};
export type ReportUpdateManyWithWhereWithoutHandledByInput = {
    where: Prisma.ReportScalarWhereInput;
    data: Prisma.XOR<Prisma.ReportUpdateManyMutationInput, Prisma.ReportUncheckedUpdateManyWithoutHandledByInput>;
};
export type ReportCreateWithoutContributionInput = {
    id?: string;
    reason: $Enums.ReportReason;
    details?: string | null;
    status?: $Enums.ReportStatus;
    handledAt?: Date | string | null;
    decisionNote?: string | null;
    createdAt?: Date | string;
    reporter: Prisma.UserCreateNestedOneWithoutReportsMadeInput;
    handledBy?: Prisma.UserCreateNestedOneWithoutReportsHandledInput;
    thread?: Prisma.ForumThreadCreateNestedOneWithoutReportsInput;
    answer?: Prisma.ForumAnswerCreateNestedOneWithoutReportsInput;
    sanctions?: Prisma.SanctionCreateNestedManyWithoutReportInput;
};
export type ReportUncheckedCreateWithoutContributionInput = {
    id?: string;
    reporterId: string;
    threadId?: string | null;
    answerId?: string | null;
    reason: $Enums.ReportReason;
    details?: string | null;
    status?: $Enums.ReportStatus;
    handledById?: string | null;
    handledAt?: Date | string | null;
    decisionNote?: string | null;
    createdAt?: Date | string;
    sanctions?: Prisma.SanctionUncheckedCreateNestedManyWithoutReportInput;
};
export type ReportCreateOrConnectWithoutContributionInput = {
    where: Prisma.ReportWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReportCreateWithoutContributionInput, Prisma.ReportUncheckedCreateWithoutContributionInput>;
};
export type ReportCreateManyContributionInputEnvelope = {
    data: Prisma.ReportCreateManyContributionInput | Prisma.ReportCreateManyContributionInput[];
    skipDuplicates?: boolean;
};
export type ReportUpsertWithWhereUniqueWithoutContributionInput = {
    where: Prisma.ReportWhereUniqueInput;
    update: Prisma.XOR<Prisma.ReportUpdateWithoutContributionInput, Prisma.ReportUncheckedUpdateWithoutContributionInput>;
    create: Prisma.XOR<Prisma.ReportCreateWithoutContributionInput, Prisma.ReportUncheckedCreateWithoutContributionInput>;
};
export type ReportUpdateWithWhereUniqueWithoutContributionInput = {
    where: Prisma.ReportWhereUniqueInput;
    data: Prisma.XOR<Prisma.ReportUpdateWithoutContributionInput, Prisma.ReportUncheckedUpdateWithoutContributionInput>;
};
export type ReportUpdateManyWithWhereWithoutContributionInput = {
    where: Prisma.ReportScalarWhereInput;
    data: Prisma.XOR<Prisma.ReportUpdateManyMutationInput, Prisma.ReportUncheckedUpdateManyWithoutContributionInput>;
};
export type ReportCreateWithoutThreadInput = {
    id?: string;
    reason: $Enums.ReportReason;
    details?: string | null;
    status?: $Enums.ReportStatus;
    handledAt?: Date | string | null;
    decisionNote?: string | null;
    createdAt?: Date | string;
    reporter: Prisma.UserCreateNestedOneWithoutReportsMadeInput;
    handledBy?: Prisma.UserCreateNestedOneWithoutReportsHandledInput;
    answer?: Prisma.ForumAnswerCreateNestedOneWithoutReportsInput;
    contribution?: Prisma.ContributionCreateNestedOneWithoutReportsInput;
    sanctions?: Prisma.SanctionCreateNestedManyWithoutReportInput;
};
export type ReportUncheckedCreateWithoutThreadInput = {
    id?: string;
    reporterId: string;
    answerId?: string | null;
    contributionId?: string | null;
    reason: $Enums.ReportReason;
    details?: string | null;
    status?: $Enums.ReportStatus;
    handledById?: string | null;
    handledAt?: Date | string | null;
    decisionNote?: string | null;
    createdAt?: Date | string;
    sanctions?: Prisma.SanctionUncheckedCreateNestedManyWithoutReportInput;
};
export type ReportCreateOrConnectWithoutThreadInput = {
    where: Prisma.ReportWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReportCreateWithoutThreadInput, Prisma.ReportUncheckedCreateWithoutThreadInput>;
};
export type ReportCreateManyThreadInputEnvelope = {
    data: Prisma.ReportCreateManyThreadInput | Prisma.ReportCreateManyThreadInput[];
    skipDuplicates?: boolean;
};
export type ReportUpsertWithWhereUniqueWithoutThreadInput = {
    where: Prisma.ReportWhereUniqueInput;
    update: Prisma.XOR<Prisma.ReportUpdateWithoutThreadInput, Prisma.ReportUncheckedUpdateWithoutThreadInput>;
    create: Prisma.XOR<Prisma.ReportCreateWithoutThreadInput, Prisma.ReportUncheckedCreateWithoutThreadInput>;
};
export type ReportUpdateWithWhereUniqueWithoutThreadInput = {
    where: Prisma.ReportWhereUniqueInput;
    data: Prisma.XOR<Prisma.ReportUpdateWithoutThreadInput, Prisma.ReportUncheckedUpdateWithoutThreadInput>;
};
export type ReportUpdateManyWithWhereWithoutThreadInput = {
    where: Prisma.ReportScalarWhereInput;
    data: Prisma.XOR<Prisma.ReportUpdateManyMutationInput, Prisma.ReportUncheckedUpdateManyWithoutThreadInput>;
};
export type ReportCreateWithoutAnswerInput = {
    id?: string;
    reason: $Enums.ReportReason;
    details?: string | null;
    status?: $Enums.ReportStatus;
    handledAt?: Date | string | null;
    decisionNote?: string | null;
    createdAt?: Date | string;
    reporter: Prisma.UserCreateNestedOneWithoutReportsMadeInput;
    handledBy?: Prisma.UserCreateNestedOneWithoutReportsHandledInput;
    thread?: Prisma.ForumThreadCreateNestedOneWithoutReportsInput;
    contribution?: Prisma.ContributionCreateNestedOneWithoutReportsInput;
    sanctions?: Prisma.SanctionCreateNestedManyWithoutReportInput;
};
export type ReportUncheckedCreateWithoutAnswerInput = {
    id?: string;
    reporterId: string;
    threadId?: string | null;
    contributionId?: string | null;
    reason: $Enums.ReportReason;
    details?: string | null;
    status?: $Enums.ReportStatus;
    handledById?: string | null;
    handledAt?: Date | string | null;
    decisionNote?: string | null;
    createdAt?: Date | string;
    sanctions?: Prisma.SanctionUncheckedCreateNestedManyWithoutReportInput;
};
export type ReportCreateOrConnectWithoutAnswerInput = {
    where: Prisma.ReportWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReportCreateWithoutAnswerInput, Prisma.ReportUncheckedCreateWithoutAnswerInput>;
};
export type ReportCreateManyAnswerInputEnvelope = {
    data: Prisma.ReportCreateManyAnswerInput | Prisma.ReportCreateManyAnswerInput[];
    skipDuplicates?: boolean;
};
export type ReportUpsertWithWhereUniqueWithoutAnswerInput = {
    where: Prisma.ReportWhereUniqueInput;
    update: Prisma.XOR<Prisma.ReportUpdateWithoutAnswerInput, Prisma.ReportUncheckedUpdateWithoutAnswerInput>;
    create: Prisma.XOR<Prisma.ReportCreateWithoutAnswerInput, Prisma.ReportUncheckedCreateWithoutAnswerInput>;
};
export type ReportUpdateWithWhereUniqueWithoutAnswerInput = {
    where: Prisma.ReportWhereUniqueInput;
    data: Prisma.XOR<Prisma.ReportUpdateWithoutAnswerInput, Prisma.ReportUncheckedUpdateWithoutAnswerInput>;
};
export type ReportUpdateManyWithWhereWithoutAnswerInput = {
    where: Prisma.ReportScalarWhereInput;
    data: Prisma.XOR<Prisma.ReportUpdateManyMutationInput, Prisma.ReportUncheckedUpdateManyWithoutAnswerInput>;
};
export type ReportCreateWithoutSanctionsInput = {
    id?: string;
    reason: $Enums.ReportReason;
    details?: string | null;
    status?: $Enums.ReportStatus;
    handledAt?: Date | string | null;
    decisionNote?: string | null;
    createdAt?: Date | string;
    reporter: Prisma.UserCreateNestedOneWithoutReportsMadeInput;
    handledBy?: Prisma.UserCreateNestedOneWithoutReportsHandledInput;
    thread?: Prisma.ForumThreadCreateNestedOneWithoutReportsInput;
    answer?: Prisma.ForumAnswerCreateNestedOneWithoutReportsInput;
    contribution?: Prisma.ContributionCreateNestedOneWithoutReportsInput;
};
export type ReportUncheckedCreateWithoutSanctionsInput = {
    id?: string;
    reporterId: string;
    threadId?: string | null;
    answerId?: string | null;
    contributionId?: string | null;
    reason: $Enums.ReportReason;
    details?: string | null;
    status?: $Enums.ReportStatus;
    handledById?: string | null;
    handledAt?: Date | string | null;
    decisionNote?: string | null;
    createdAt?: Date | string;
};
export type ReportCreateOrConnectWithoutSanctionsInput = {
    where: Prisma.ReportWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReportCreateWithoutSanctionsInput, Prisma.ReportUncheckedCreateWithoutSanctionsInput>;
};
export type ReportUpsertWithoutSanctionsInput = {
    update: Prisma.XOR<Prisma.ReportUpdateWithoutSanctionsInput, Prisma.ReportUncheckedUpdateWithoutSanctionsInput>;
    create: Prisma.XOR<Prisma.ReportCreateWithoutSanctionsInput, Prisma.ReportUncheckedCreateWithoutSanctionsInput>;
    where?: Prisma.ReportWhereInput;
};
export type ReportUpdateToOneWithWhereWithoutSanctionsInput = {
    where?: Prisma.ReportWhereInput;
    data: Prisma.XOR<Prisma.ReportUpdateWithoutSanctionsInput, Prisma.ReportUncheckedUpdateWithoutSanctionsInput>;
};
export type ReportUpdateWithoutSanctionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.EnumReportReasonFieldUpdateOperationsInput | $Enums.ReportReason;
    details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus;
    handledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decisionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reporter?: Prisma.UserUpdateOneRequiredWithoutReportsMadeNestedInput;
    handledBy?: Prisma.UserUpdateOneWithoutReportsHandledNestedInput;
    thread?: Prisma.ForumThreadUpdateOneWithoutReportsNestedInput;
    answer?: Prisma.ForumAnswerUpdateOneWithoutReportsNestedInput;
    contribution?: Prisma.ContributionUpdateOneWithoutReportsNestedInput;
};
export type ReportUncheckedUpdateWithoutSanctionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reporterId?: Prisma.StringFieldUpdateOperationsInput | string;
    threadId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    answerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contributionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.EnumReportReasonFieldUpdateOperationsInput | $Enums.ReportReason;
    details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus;
    handledById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    handledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decisionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReportCreateManyReporterInput = {
    id?: string;
    threadId?: string | null;
    answerId?: string | null;
    contributionId?: string | null;
    reason: $Enums.ReportReason;
    details?: string | null;
    status?: $Enums.ReportStatus;
    handledById?: string | null;
    handledAt?: Date | string | null;
    decisionNote?: string | null;
    createdAt?: Date | string;
};
export type ReportCreateManyHandledByInput = {
    id?: string;
    reporterId: string;
    threadId?: string | null;
    answerId?: string | null;
    contributionId?: string | null;
    reason: $Enums.ReportReason;
    details?: string | null;
    status?: $Enums.ReportStatus;
    handledAt?: Date | string | null;
    decisionNote?: string | null;
    createdAt?: Date | string;
};
export type ReportUpdateWithoutReporterInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.EnumReportReasonFieldUpdateOperationsInput | $Enums.ReportReason;
    details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus;
    handledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decisionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    handledBy?: Prisma.UserUpdateOneWithoutReportsHandledNestedInput;
    thread?: Prisma.ForumThreadUpdateOneWithoutReportsNestedInput;
    answer?: Prisma.ForumAnswerUpdateOneWithoutReportsNestedInput;
    contribution?: Prisma.ContributionUpdateOneWithoutReportsNestedInput;
    sanctions?: Prisma.SanctionUpdateManyWithoutReportNestedInput;
};
export type ReportUncheckedUpdateWithoutReporterInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    threadId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    answerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contributionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.EnumReportReasonFieldUpdateOperationsInput | $Enums.ReportReason;
    details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus;
    handledById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    handledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decisionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sanctions?: Prisma.SanctionUncheckedUpdateManyWithoutReportNestedInput;
};
export type ReportUncheckedUpdateManyWithoutReporterInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    threadId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    answerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contributionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.EnumReportReasonFieldUpdateOperationsInput | $Enums.ReportReason;
    details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus;
    handledById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    handledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decisionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReportUpdateWithoutHandledByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.EnumReportReasonFieldUpdateOperationsInput | $Enums.ReportReason;
    details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus;
    handledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decisionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reporter?: Prisma.UserUpdateOneRequiredWithoutReportsMadeNestedInput;
    thread?: Prisma.ForumThreadUpdateOneWithoutReportsNestedInput;
    answer?: Prisma.ForumAnswerUpdateOneWithoutReportsNestedInput;
    contribution?: Prisma.ContributionUpdateOneWithoutReportsNestedInput;
    sanctions?: Prisma.SanctionUpdateManyWithoutReportNestedInput;
};
export type ReportUncheckedUpdateWithoutHandledByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reporterId?: Prisma.StringFieldUpdateOperationsInput | string;
    threadId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    answerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contributionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.EnumReportReasonFieldUpdateOperationsInput | $Enums.ReportReason;
    details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus;
    handledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decisionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sanctions?: Prisma.SanctionUncheckedUpdateManyWithoutReportNestedInput;
};
export type ReportUncheckedUpdateManyWithoutHandledByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reporterId?: Prisma.StringFieldUpdateOperationsInput | string;
    threadId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    answerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contributionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.EnumReportReasonFieldUpdateOperationsInput | $Enums.ReportReason;
    details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus;
    handledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decisionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReportCreateManyContributionInput = {
    id?: string;
    reporterId: string;
    threadId?: string | null;
    answerId?: string | null;
    reason: $Enums.ReportReason;
    details?: string | null;
    status?: $Enums.ReportStatus;
    handledById?: string | null;
    handledAt?: Date | string | null;
    decisionNote?: string | null;
    createdAt?: Date | string;
};
export type ReportUpdateWithoutContributionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.EnumReportReasonFieldUpdateOperationsInput | $Enums.ReportReason;
    details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus;
    handledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decisionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reporter?: Prisma.UserUpdateOneRequiredWithoutReportsMadeNestedInput;
    handledBy?: Prisma.UserUpdateOneWithoutReportsHandledNestedInput;
    thread?: Prisma.ForumThreadUpdateOneWithoutReportsNestedInput;
    answer?: Prisma.ForumAnswerUpdateOneWithoutReportsNestedInput;
    sanctions?: Prisma.SanctionUpdateManyWithoutReportNestedInput;
};
export type ReportUncheckedUpdateWithoutContributionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reporterId?: Prisma.StringFieldUpdateOperationsInput | string;
    threadId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    answerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.EnumReportReasonFieldUpdateOperationsInput | $Enums.ReportReason;
    details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus;
    handledById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    handledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decisionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sanctions?: Prisma.SanctionUncheckedUpdateManyWithoutReportNestedInput;
};
export type ReportUncheckedUpdateManyWithoutContributionInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reporterId?: Prisma.StringFieldUpdateOperationsInput | string;
    threadId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    answerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.EnumReportReasonFieldUpdateOperationsInput | $Enums.ReportReason;
    details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus;
    handledById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    handledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decisionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReportCreateManyThreadInput = {
    id?: string;
    reporterId: string;
    answerId?: string | null;
    contributionId?: string | null;
    reason: $Enums.ReportReason;
    details?: string | null;
    status?: $Enums.ReportStatus;
    handledById?: string | null;
    handledAt?: Date | string | null;
    decisionNote?: string | null;
    createdAt?: Date | string;
};
export type ReportUpdateWithoutThreadInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.EnumReportReasonFieldUpdateOperationsInput | $Enums.ReportReason;
    details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus;
    handledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decisionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reporter?: Prisma.UserUpdateOneRequiredWithoutReportsMadeNestedInput;
    handledBy?: Prisma.UserUpdateOneWithoutReportsHandledNestedInput;
    answer?: Prisma.ForumAnswerUpdateOneWithoutReportsNestedInput;
    contribution?: Prisma.ContributionUpdateOneWithoutReportsNestedInput;
    sanctions?: Prisma.SanctionUpdateManyWithoutReportNestedInput;
};
export type ReportUncheckedUpdateWithoutThreadInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reporterId?: Prisma.StringFieldUpdateOperationsInput | string;
    answerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contributionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.EnumReportReasonFieldUpdateOperationsInput | $Enums.ReportReason;
    details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus;
    handledById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    handledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decisionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sanctions?: Prisma.SanctionUncheckedUpdateManyWithoutReportNestedInput;
};
export type ReportUncheckedUpdateManyWithoutThreadInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reporterId?: Prisma.StringFieldUpdateOperationsInput | string;
    answerId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contributionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.EnumReportReasonFieldUpdateOperationsInput | $Enums.ReportReason;
    details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus;
    handledById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    handledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decisionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReportCreateManyAnswerInput = {
    id?: string;
    reporterId: string;
    threadId?: string | null;
    contributionId?: string | null;
    reason: $Enums.ReportReason;
    details?: string | null;
    status?: $Enums.ReportStatus;
    handledById?: string | null;
    handledAt?: Date | string | null;
    decisionNote?: string | null;
    createdAt?: Date | string;
};
export type ReportUpdateWithoutAnswerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reason?: Prisma.EnumReportReasonFieldUpdateOperationsInput | $Enums.ReportReason;
    details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus;
    handledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decisionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reporter?: Prisma.UserUpdateOneRequiredWithoutReportsMadeNestedInput;
    handledBy?: Prisma.UserUpdateOneWithoutReportsHandledNestedInput;
    thread?: Prisma.ForumThreadUpdateOneWithoutReportsNestedInput;
    contribution?: Prisma.ContributionUpdateOneWithoutReportsNestedInput;
    sanctions?: Prisma.SanctionUpdateManyWithoutReportNestedInput;
};
export type ReportUncheckedUpdateWithoutAnswerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reporterId?: Prisma.StringFieldUpdateOperationsInput | string;
    threadId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contributionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.EnumReportReasonFieldUpdateOperationsInput | $Enums.ReportReason;
    details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus;
    handledById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    handledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decisionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    sanctions?: Prisma.SanctionUncheckedUpdateManyWithoutReportNestedInput;
};
export type ReportUncheckedUpdateManyWithoutAnswerInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reporterId?: Prisma.StringFieldUpdateOperationsInput | string;
    threadId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    contributionId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.EnumReportReasonFieldUpdateOperationsInput | $Enums.ReportReason;
    details?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumReportStatusFieldUpdateOperationsInput | $Enums.ReportStatus;
    handledById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    handledAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    decisionNote?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ReportCountOutputType = {
    sanctions: number;
};
export type ReportCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    sanctions?: boolean | ReportCountOutputTypeCountSanctionsArgs;
};
export type ReportCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportCountOutputTypeSelect<ExtArgs> | null;
};
export type ReportCountOutputTypeCountSanctionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SanctionWhereInput;
};
export type ReportSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    reporterId?: boolean;
    threadId?: boolean;
    answerId?: boolean;
    contributionId?: boolean;
    reason?: boolean;
    details?: boolean;
    status?: boolean;
    handledById?: boolean;
    handledAt?: boolean;
    decisionNote?: boolean;
    createdAt?: boolean;
    reporter?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    handledBy?: boolean | Prisma.Report$handledByArgs<ExtArgs>;
    thread?: boolean | Prisma.Report$threadArgs<ExtArgs>;
    answer?: boolean | Prisma.Report$answerArgs<ExtArgs>;
    contribution?: boolean | Prisma.Report$contributionArgs<ExtArgs>;
    sanctions?: boolean | Prisma.Report$sanctionsArgs<ExtArgs>;
    _count?: boolean | Prisma.ReportCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["report"]>;
export type ReportSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    reporterId?: boolean;
    threadId?: boolean;
    answerId?: boolean;
    contributionId?: boolean;
    reason?: boolean;
    details?: boolean;
    status?: boolean;
    handledById?: boolean;
    handledAt?: boolean;
    decisionNote?: boolean;
    createdAt?: boolean;
    reporter?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    handledBy?: boolean | Prisma.Report$handledByArgs<ExtArgs>;
    thread?: boolean | Prisma.Report$threadArgs<ExtArgs>;
    answer?: boolean | Prisma.Report$answerArgs<ExtArgs>;
    contribution?: boolean | Prisma.Report$contributionArgs<ExtArgs>;
}, ExtArgs["result"]["report"]>;
export type ReportSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    reporterId?: boolean;
    threadId?: boolean;
    answerId?: boolean;
    contributionId?: boolean;
    reason?: boolean;
    details?: boolean;
    status?: boolean;
    handledById?: boolean;
    handledAt?: boolean;
    decisionNote?: boolean;
    createdAt?: boolean;
    reporter?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    handledBy?: boolean | Prisma.Report$handledByArgs<ExtArgs>;
    thread?: boolean | Prisma.Report$threadArgs<ExtArgs>;
    answer?: boolean | Prisma.Report$answerArgs<ExtArgs>;
    contribution?: boolean | Prisma.Report$contributionArgs<ExtArgs>;
}, ExtArgs["result"]["report"]>;
export type ReportSelectScalar = {
    id?: boolean;
    reporterId?: boolean;
    threadId?: boolean;
    answerId?: boolean;
    contributionId?: boolean;
    reason?: boolean;
    details?: boolean;
    status?: boolean;
    handledById?: boolean;
    handledAt?: boolean;
    decisionNote?: boolean;
    createdAt?: boolean;
};
export type ReportOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "reporterId" | "threadId" | "answerId" | "contributionId" | "reason" | "details" | "status" | "handledById" | "handledAt" | "decisionNote" | "createdAt", ExtArgs["result"]["report"]>;
export type ReportInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    reporter?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    handledBy?: boolean | Prisma.Report$handledByArgs<ExtArgs>;
    thread?: boolean | Prisma.Report$threadArgs<ExtArgs>;
    answer?: boolean | Prisma.Report$answerArgs<ExtArgs>;
    contribution?: boolean | Prisma.Report$contributionArgs<ExtArgs>;
    sanctions?: boolean | Prisma.Report$sanctionsArgs<ExtArgs>;
    _count?: boolean | Prisma.ReportCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ReportIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    reporter?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    handledBy?: boolean | Prisma.Report$handledByArgs<ExtArgs>;
    thread?: boolean | Prisma.Report$threadArgs<ExtArgs>;
    answer?: boolean | Prisma.Report$answerArgs<ExtArgs>;
    contribution?: boolean | Prisma.Report$contributionArgs<ExtArgs>;
};
export type ReportIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    reporter?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    handledBy?: boolean | Prisma.Report$handledByArgs<ExtArgs>;
    thread?: boolean | Prisma.Report$threadArgs<ExtArgs>;
    answer?: boolean | Prisma.Report$answerArgs<ExtArgs>;
    contribution?: boolean | Prisma.Report$contributionArgs<ExtArgs>;
};
export type $ReportPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Report";
    objects: {
        reporter: Prisma.$UserPayload<ExtArgs>;
        handledBy: Prisma.$UserPayload<ExtArgs> | null;
        thread: Prisma.$ForumThreadPayload<ExtArgs> | null;
        answer: Prisma.$ForumAnswerPayload<ExtArgs> | null;
        contribution: Prisma.$ContributionPayload<ExtArgs> | null;
        sanctions: Prisma.$SanctionPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        reporterId: string;
        threadId: string | null;
        answerId: string | null;
        contributionId: string | null;
        reason: $Enums.ReportReason;
        details: string | null;
        status: $Enums.ReportStatus;
        handledById: string | null;
        handledAt: Date | null;
        decisionNote: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["report"]>;
    composites: {};
};
export type ReportGetPayload<S extends boolean | null | undefined | ReportDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ReportPayload, S>;
export type ReportCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ReportFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ReportCountAggregateInputType | true;
};
export interface ReportDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Report'];
        meta: {
            name: 'Report';
        };
    };
    findUnique<T extends ReportFindUniqueArgs>(args: Prisma.SelectSubset<T, ReportFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ReportClient<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ReportFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ReportFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ReportClient<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ReportFindFirstArgs>(args?: Prisma.SelectSubset<T, ReportFindFirstArgs<ExtArgs>>): Prisma.Prisma__ReportClient<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ReportFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ReportFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ReportClient<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ReportFindManyArgs>(args?: Prisma.SelectSubset<T, ReportFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ReportCreateArgs>(args: Prisma.SelectSubset<T, ReportCreateArgs<ExtArgs>>): Prisma.Prisma__ReportClient<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ReportCreateManyArgs>(args?: Prisma.SelectSubset<T, ReportCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ReportCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ReportCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ReportDeleteArgs>(args: Prisma.SelectSubset<T, ReportDeleteArgs<ExtArgs>>): Prisma.Prisma__ReportClient<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ReportUpdateArgs>(args: Prisma.SelectSubset<T, ReportUpdateArgs<ExtArgs>>): Prisma.Prisma__ReportClient<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ReportDeleteManyArgs>(args?: Prisma.SelectSubset<T, ReportDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ReportUpdateManyArgs>(args: Prisma.SelectSubset<T, ReportUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ReportUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ReportUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ReportUpsertArgs>(args: Prisma.SelectSubset<T, ReportUpsertArgs<ExtArgs>>): Prisma.Prisma__ReportClient<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ReportCountArgs>(args?: Prisma.Subset<T, ReportCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ReportCountAggregateOutputType> : number>;
    aggregate<T extends ReportAggregateArgs>(args: Prisma.Subset<T, ReportAggregateArgs>): Prisma.PrismaPromise<GetReportAggregateType<T>>;
    groupBy<T extends ReportGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ReportGroupByArgs['orderBy'];
    } : {
        orderBy?: ReportGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ReportFieldRefs;
}
export interface Prisma__ReportClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    reporter<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    handledBy<T extends Prisma.Report$handledByArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Report$handledByArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    thread<T extends Prisma.Report$threadArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Report$threadArgs<ExtArgs>>): Prisma.Prisma__ForumThreadClient<runtime.Types.Result.GetResult<Prisma.$ForumThreadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    answer<T extends Prisma.Report$answerArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Report$answerArgs<ExtArgs>>): Prisma.Prisma__ForumAnswerClient<runtime.Types.Result.GetResult<Prisma.$ForumAnswerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    contribution<T extends Prisma.Report$contributionArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Report$contributionArgs<ExtArgs>>): Prisma.Prisma__ContributionClient<runtime.Types.Result.GetResult<Prisma.$ContributionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    sanctions<T extends Prisma.Report$sanctionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Report$sanctionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SanctionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ReportFieldRefs {
    readonly id: Prisma.FieldRef<"Report", 'String'>;
    readonly reporterId: Prisma.FieldRef<"Report", 'String'>;
    readonly threadId: Prisma.FieldRef<"Report", 'String'>;
    readonly answerId: Prisma.FieldRef<"Report", 'String'>;
    readonly contributionId: Prisma.FieldRef<"Report", 'String'>;
    readonly reason: Prisma.FieldRef<"Report", 'ReportReason'>;
    readonly details: Prisma.FieldRef<"Report", 'String'>;
    readonly status: Prisma.FieldRef<"Report", 'ReportStatus'>;
    readonly handledById: Prisma.FieldRef<"Report", 'String'>;
    readonly handledAt: Prisma.FieldRef<"Report", 'DateTime'>;
    readonly decisionNote: Prisma.FieldRef<"Report", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Report", 'DateTime'>;
}
export type ReportFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportSelect<ExtArgs> | null;
    omit?: Prisma.ReportOmit<ExtArgs> | null;
    include?: Prisma.ReportInclude<ExtArgs> | null;
    where: Prisma.ReportWhereUniqueInput;
};
export type ReportFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportSelect<ExtArgs> | null;
    omit?: Prisma.ReportOmit<ExtArgs> | null;
    include?: Prisma.ReportInclude<ExtArgs> | null;
    where: Prisma.ReportWhereUniqueInput;
};
export type ReportFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportSelect<ExtArgs> | null;
    omit?: Prisma.ReportOmit<ExtArgs> | null;
    include?: Prisma.ReportInclude<ExtArgs> | null;
    where?: Prisma.ReportWhereInput;
    orderBy?: Prisma.ReportOrderByWithRelationInput | Prisma.ReportOrderByWithRelationInput[];
    cursor?: Prisma.ReportWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReportScalarFieldEnum | Prisma.ReportScalarFieldEnum[];
};
export type ReportFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportSelect<ExtArgs> | null;
    omit?: Prisma.ReportOmit<ExtArgs> | null;
    include?: Prisma.ReportInclude<ExtArgs> | null;
    where?: Prisma.ReportWhereInput;
    orderBy?: Prisma.ReportOrderByWithRelationInput | Prisma.ReportOrderByWithRelationInput[];
    cursor?: Prisma.ReportWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReportScalarFieldEnum | Prisma.ReportScalarFieldEnum[];
};
export type ReportFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportSelect<ExtArgs> | null;
    omit?: Prisma.ReportOmit<ExtArgs> | null;
    include?: Prisma.ReportInclude<ExtArgs> | null;
    where?: Prisma.ReportWhereInput;
    orderBy?: Prisma.ReportOrderByWithRelationInput | Prisma.ReportOrderByWithRelationInput[];
    cursor?: Prisma.ReportWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ReportScalarFieldEnum | Prisma.ReportScalarFieldEnum[];
};
export type ReportCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportSelect<ExtArgs> | null;
    omit?: Prisma.ReportOmit<ExtArgs> | null;
    include?: Prisma.ReportInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReportCreateInput, Prisma.ReportUncheckedCreateInput>;
};
export type ReportCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ReportCreateManyInput | Prisma.ReportCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ReportCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ReportOmit<ExtArgs> | null;
    data: Prisma.ReportCreateManyInput | Prisma.ReportCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ReportIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ReportUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportSelect<ExtArgs> | null;
    omit?: Prisma.ReportOmit<ExtArgs> | null;
    include?: Prisma.ReportInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReportUpdateInput, Prisma.ReportUncheckedUpdateInput>;
    where: Prisma.ReportWhereUniqueInput;
};
export type ReportUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ReportUpdateManyMutationInput, Prisma.ReportUncheckedUpdateManyInput>;
    where?: Prisma.ReportWhereInput;
    limit?: number;
};
export type ReportUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ReportOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ReportUpdateManyMutationInput, Prisma.ReportUncheckedUpdateManyInput>;
    where?: Prisma.ReportWhereInput;
    limit?: number;
    include?: Prisma.ReportIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ReportUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportSelect<ExtArgs> | null;
    omit?: Prisma.ReportOmit<ExtArgs> | null;
    include?: Prisma.ReportInclude<ExtArgs> | null;
    where: Prisma.ReportWhereUniqueInput;
    create: Prisma.XOR<Prisma.ReportCreateInput, Prisma.ReportUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ReportUpdateInput, Prisma.ReportUncheckedUpdateInput>;
};
export type ReportDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportSelect<ExtArgs> | null;
    omit?: Prisma.ReportOmit<ExtArgs> | null;
    include?: Prisma.ReportInclude<ExtArgs> | null;
    where: Prisma.ReportWhereUniqueInput;
};
export type ReportDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReportWhereInput;
    limit?: number;
};
export type Report$handledByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
export type Report$threadArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ForumThreadSelect<ExtArgs> | null;
    omit?: Prisma.ForumThreadOmit<ExtArgs> | null;
    include?: Prisma.ForumThreadInclude<ExtArgs> | null;
    where?: Prisma.ForumThreadWhereInput;
};
export type Report$answerArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ForumAnswerSelect<ExtArgs> | null;
    omit?: Prisma.ForumAnswerOmit<ExtArgs> | null;
    include?: Prisma.ForumAnswerInclude<ExtArgs> | null;
    where?: Prisma.ForumAnswerWhereInput;
};
export type Report$contributionArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ContributionSelect<ExtArgs> | null;
    omit?: Prisma.ContributionOmit<ExtArgs> | null;
    include?: Prisma.ContributionInclude<ExtArgs> | null;
    where?: Prisma.ContributionWhereInput;
};
export type Report$sanctionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ReportDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ReportSelect<ExtArgs> | null;
    omit?: Prisma.ReportOmit<ExtArgs> | null;
    include?: Prisma.ReportInclude<ExtArgs> | null;
};
