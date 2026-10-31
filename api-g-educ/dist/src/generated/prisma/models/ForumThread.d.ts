import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ForumThreadModel = runtime.Types.Result.DefaultSelection<Prisma.$ForumThreadPayload>;
export type AggregateForumThread = {
    _count: ForumThreadCountAggregateOutputType | null;
    _avg: ForumThreadAvgAggregateOutputType | null;
    _sum: ForumThreadSumAggregateOutputType | null;
    _min: ForumThreadMinAggregateOutputType | null;
    _max: ForumThreadMaxAggregateOutputType | null;
};
export type ForumThreadAvgAggregateOutputType = {
    answersCount: number | null;
};
export type ForumThreadSumAggregateOutputType = {
    answersCount: number | null;
};
export type ForumThreadMinAggregateOutputType = {
    id: string | null;
    classId: string | null;
    classSubjectId: string | null;
    authorId: string | null;
    title: string | null;
    body: string | null;
    status: $Enums.ForumStatus | null;
    answersCount: number | null;
    lastActivityAt: Date | null;
    hiddenAt: Date | null;
    hiddenReason: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ForumThreadMaxAggregateOutputType = {
    id: string | null;
    classId: string | null;
    classSubjectId: string | null;
    authorId: string | null;
    title: string | null;
    body: string | null;
    status: $Enums.ForumStatus | null;
    answersCount: number | null;
    lastActivityAt: Date | null;
    hiddenAt: Date | null;
    hiddenReason: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ForumThreadCountAggregateOutputType = {
    id: number;
    classId: number;
    classSubjectId: number;
    authorId: number;
    title: number;
    body: number;
    status: number;
    answersCount: number;
    lastActivityAt: number;
    hiddenAt: number;
    hiddenReason: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ForumThreadAvgAggregateInputType = {
    answersCount?: true;
};
export type ForumThreadSumAggregateInputType = {
    answersCount?: true;
};
export type ForumThreadMinAggregateInputType = {
    id?: true;
    classId?: true;
    classSubjectId?: true;
    authorId?: true;
    title?: true;
    body?: true;
    status?: true;
    answersCount?: true;
    lastActivityAt?: true;
    hiddenAt?: true;
    hiddenReason?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ForumThreadMaxAggregateInputType = {
    id?: true;
    classId?: true;
    classSubjectId?: true;
    authorId?: true;
    title?: true;
    body?: true;
    status?: true;
    answersCount?: true;
    lastActivityAt?: true;
    hiddenAt?: true;
    hiddenReason?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ForumThreadCountAggregateInputType = {
    id?: true;
    classId?: true;
    classSubjectId?: true;
    authorId?: true;
    title?: true;
    body?: true;
    status?: true;
    answersCount?: true;
    lastActivityAt?: true;
    hiddenAt?: true;
    hiddenReason?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ForumThreadAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ForumThreadWhereInput;
    orderBy?: Prisma.ForumThreadOrderByWithRelationInput | Prisma.ForumThreadOrderByWithRelationInput[];
    cursor?: Prisma.ForumThreadWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ForumThreadCountAggregateInputType;
    _avg?: ForumThreadAvgAggregateInputType;
    _sum?: ForumThreadSumAggregateInputType;
    _min?: ForumThreadMinAggregateInputType;
    _max?: ForumThreadMaxAggregateInputType;
};
export type GetForumThreadAggregateType<T extends ForumThreadAggregateArgs> = {
    [P in keyof T & keyof AggregateForumThread]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateForumThread[P]> : Prisma.GetScalarType<T[P], AggregateForumThread[P]>;
};
export type ForumThreadGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ForumThreadWhereInput;
    orderBy?: Prisma.ForumThreadOrderByWithAggregationInput | Prisma.ForumThreadOrderByWithAggregationInput[];
    by: Prisma.ForumThreadScalarFieldEnum[] | Prisma.ForumThreadScalarFieldEnum;
    having?: Prisma.ForumThreadScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ForumThreadCountAggregateInputType | true;
    _avg?: ForumThreadAvgAggregateInputType;
    _sum?: ForumThreadSumAggregateInputType;
    _min?: ForumThreadMinAggregateInputType;
    _max?: ForumThreadMaxAggregateInputType;
};
export type ForumThreadGroupByOutputType = {
    id: string;
    classId: string;
    classSubjectId: string | null;
    authorId: string;
    title: string;
    body: string;
    status: $Enums.ForumStatus;
    answersCount: number;
    lastActivityAt: Date;
    hiddenAt: Date | null;
    hiddenReason: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: ForumThreadCountAggregateOutputType | null;
    _avg: ForumThreadAvgAggregateOutputType | null;
    _sum: ForumThreadSumAggregateOutputType | null;
    _min: ForumThreadMinAggregateOutputType | null;
    _max: ForumThreadMaxAggregateOutputType | null;
};
export type GetForumThreadGroupByPayload<T extends ForumThreadGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ForumThreadGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ForumThreadGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ForumThreadGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ForumThreadGroupByOutputType[P]>;
}>>;
export type ForumThreadWhereInput = {
    AND?: Prisma.ForumThreadWhereInput | Prisma.ForumThreadWhereInput[];
    OR?: Prisma.ForumThreadWhereInput[];
    NOT?: Prisma.ForumThreadWhereInput | Prisma.ForumThreadWhereInput[];
    id?: Prisma.UuidFilter<"ForumThread"> | string;
    classId?: Prisma.UuidFilter<"ForumThread"> | string;
    classSubjectId?: Prisma.UuidNullableFilter<"ForumThread"> | string | null;
    authorId?: Prisma.UuidFilter<"ForumThread"> | string;
    title?: Prisma.StringFilter<"ForumThread"> | string;
    body?: Prisma.StringFilter<"ForumThread"> | string;
    status?: Prisma.EnumForumStatusFilter<"ForumThread"> | $Enums.ForumStatus;
    answersCount?: Prisma.IntFilter<"ForumThread"> | number;
    lastActivityAt?: Prisma.DateTimeFilter<"ForumThread"> | Date | string;
    hiddenAt?: Prisma.DateTimeNullableFilter<"ForumThread"> | Date | string | null;
    hiddenReason?: Prisma.StringNullableFilter<"ForumThread"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ForumThread"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ForumThread"> | Date | string;
    class?: Prisma.XOR<Prisma.ClassScalarRelationFilter, Prisma.ClassWhereInput>;
    classSubject?: Prisma.XOR<Prisma.ClassSubjectNullableScalarRelationFilter, Prisma.ClassSubjectWhereInput> | null;
    author?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    answers?: Prisma.ForumAnswerListRelationFilter;
    reports?: Prisma.ReportListRelationFilter;
};
export type ForumThreadOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    classId?: Prisma.SortOrder;
    classSubjectId?: Prisma.SortOrderInput | Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    body?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    answersCount?: Prisma.SortOrder;
    lastActivityAt?: Prisma.SortOrder;
    hiddenAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    hiddenReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    class?: Prisma.ClassOrderByWithRelationInput;
    classSubject?: Prisma.ClassSubjectOrderByWithRelationInput;
    author?: Prisma.UserOrderByWithRelationInput;
    answers?: Prisma.ForumAnswerOrderByRelationAggregateInput;
    reports?: Prisma.ReportOrderByRelationAggregateInput;
};
export type ForumThreadWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    id_classId?: Prisma.ForumThreadIdClassIdCompoundUniqueInput;
    AND?: Prisma.ForumThreadWhereInput | Prisma.ForumThreadWhereInput[];
    OR?: Prisma.ForumThreadWhereInput[];
    NOT?: Prisma.ForumThreadWhereInput | Prisma.ForumThreadWhereInput[];
    classId?: Prisma.UuidFilter<"ForumThread"> | string;
    classSubjectId?: Prisma.UuidNullableFilter<"ForumThread"> | string | null;
    authorId?: Prisma.UuidFilter<"ForumThread"> | string;
    title?: Prisma.StringFilter<"ForumThread"> | string;
    body?: Prisma.StringFilter<"ForumThread"> | string;
    status?: Prisma.EnumForumStatusFilter<"ForumThread"> | $Enums.ForumStatus;
    answersCount?: Prisma.IntFilter<"ForumThread"> | number;
    lastActivityAt?: Prisma.DateTimeFilter<"ForumThread"> | Date | string;
    hiddenAt?: Prisma.DateTimeNullableFilter<"ForumThread"> | Date | string | null;
    hiddenReason?: Prisma.StringNullableFilter<"ForumThread"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ForumThread"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ForumThread"> | Date | string;
    class?: Prisma.XOR<Prisma.ClassScalarRelationFilter, Prisma.ClassWhereInput>;
    classSubject?: Prisma.XOR<Prisma.ClassSubjectNullableScalarRelationFilter, Prisma.ClassSubjectWhereInput> | null;
    author?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    answers?: Prisma.ForumAnswerListRelationFilter;
    reports?: Prisma.ReportListRelationFilter;
}, "id" | "id_classId">;
export type ForumThreadOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    classId?: Prisma.SortOrder;
    classSubjectId?: Prisma.SortOrderInput | Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    body?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    answersCount?: Prisma.SortOrder;
    lastActivityAt?: Prisma.SortOrder;
    hiddenAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    hiddenReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ForumThreadCountOrderByAggregateInput;
    _avg?: Prisma.ForumThreadAvgOrderByAggregateInput;
    _max?: Prisma.ForumThreadMaxOrderByAggregateInput;
    _min?: Prisma.ForumThreadMinOrderByAggregateInput;
    _sum?: Prisma.ForumThreadSumOrderByAggregateInput;
};
export type ForumThreadScalarWhereWithAggregatesInput = {
    AND?: Prisma.ForumThreadScalarWhereWithAggregatesInput | Prisma.ForumThreadScalarWhereWithAggregatesInput[];
    OR?: Prisma.ForumThreadScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ForumThreadScalarWhereWithAggregatesInput | Prisma.ForumThreadScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"ForumThread"> | string;
    classId?: Prisma.UuidWithAggregatesFilter<"ForumThread"> | string;
    classSubjectId?: Prisma.UuidNullableWithAggregatesFilter<"ForumThread"> | string | null;
    authorId?: Prisma.UuidWithAggregatesFilter<"ForumThread"> | string;
    title?: Prisma.StringWithAggregatesFilter<"ForumThread"> | string;
    body?: Prisma.StringWithAggregatesFilter<"ForumThread"> | string;
    status?: Prisma.EnumForumStatusWithAggregatesFilter<"ForumThread"> | $Enums.ForumStatus;
    answersCount?: Prisma.IntWithAggregatesFilter<"ForumThread"> | number;
    lastActivityAt?: Prisma.DateTimeWithAggregatesFilter<"ForumThread"> | Date | string;
    hiddenAt?: Prisma.DateTimeNullableWithAggregatesFilter<"ForumThread"> | Date | string | null;
    hiddenReason?: Prisma.StringNullableWithAggregatesFilter<"ForumThread"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ForumThread"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"ForumThread"> | Date | string;
};
export type ForumThreadCreateInput = {
    id?: string;
    title: string;
    body: string;
    status?: $Enums.ForumStatus;
    answersCount?: number;
    lastActivityAt?: Date | string;
    hiddenAt?: Date | string | null;
    hiddenReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    class: Prisma.ClassCreateNestedOneWithoutForumThreadsInput;
    classSubject?: Prisma.ClassSubjectCreateNestedOneWithoutForumThreadsInput;
    author: Prisma.UserCreateNestedOneWithoutForumThreadsInput;
    answers?: Prisma.ForumAnswerCreateNestedManyWithoutThreadInput;
    reports?: Prisma.ReportCreateNestedManyWithoutThreadInput;
};
export type ForumThreadUncheckedCreateInput = {
    id?: string;
    classId: string;
    classSubjectId?: string | null;
    authorId: string;
    title: string;
    body: string;
    status?: $Enums.ForumStatus;
    answersCount?: number;
    lastActivityAt?: Date | string;
    hiddenAt?: Date | string | null;
    hiddenReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    answers?: Prisma.ForumAnswerUncheckedCreateNestedManyWithoutThreadInput;
    reports?: Prisma.ReportUncheckedCreateNestedManyWithoutThreadInput;
};
export type ForumThreadUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumForumStatusFieldUpdateOperationsInput | $Enums.ForumStatus;
    answersCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastActivityAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hiddenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hiddenReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    class?: Prisma.ClassUpdateOneRequiredWithoutForumThreadsNestedInput;
    classSubject?: Prisma.ClassSubjectUpdateOneWithoutForumThreadsNestedInput;
    author?: Prisma.UserUpdateOneRequiredWithoutForumThreadsNestedInput;
    answers?: Prisma.ForumAnswerUpdateManyWithoutThreadNestedInput;
    reports?: Prisma.ReportUpdateManyWithoutThreadNestedInput;
};
export type ForumThreadUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    classId?: Prisma.StringFieldUpdateOperationsInput | string;
    classSubjectId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumForumStatusFieldUpdateOperationsInput | $Enums.ForumStatus;
    answersCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastActivityAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hiddenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hiddenReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    answers?: Prisma.ForumAnswerUncheckedUpdateManyWithoutThreadNestedInput;
    reports?: Prisma.ReportUncheckedUpdateManyWithoutThreadNestedInput;
};
export type ForumThreadCreateManyInput = {
    id?: string;
    classId: string;
    classSubjectId?: string | null;
    authorId: string;
    title: string;
    body: string;
    status?: $Enums.ForumStatus;
    answersCount?: number;
    lastActivityAt?: Date | string;
    hiddenAt?: Date | string | null;
    hiddenReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ForumThreadUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumForumStatusFieldUpdateOperationsInput | $Enums.ForumStatus;
    answersCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastActivityAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hiddenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hiddenReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ForumThreadUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    classId?: Prisma.StringFieldUpdateOperationsInput | string;
    classSubjectId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumForumStatusFieldUpdateOperationsInput | $Enums.ForumStatus;
    answersCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastActivityAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hiddenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hiddenReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ForumThreadListRelationFilter = {
    every?: Prisma.ForumThreadWhereInput;
    some?: Prisma.ForumThreadWhereInput;
    none?: Prisma.ForumThreadWhereInput;
};
export type ForumThreadOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ForumThreadIdClassIdCompoundUniqueInput = {
    id: string;
    classId: string;
};
export type ForumThreadCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    classId?: Prisma.SortOrder;
    classSubjectId?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    body?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    answersCount?: Prisma.SortOrder;
    lastActivityAt?: Prisma.SortOrder;
    hiddenAt?: Prisma.SortOrder;
    hiddenReason?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ForumThreadAvgOrderByAggregateInput = {
    answersCount?: Prisma.SortOrder;
};
export type ForumThreadMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    classId?: Prisma.SortOrder;
    classSubjectId?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    body?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    answersCount?: Prisma.SortOrder;
    lastActivityAt?: Prisma.SortOrder;
    hiddenAt?: Prisma.SortOrder;
    hiddenReason?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ForumThreadMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    classId?: Prisma.SortOrder;
    classSubjectId?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    body?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    answersCount?: Prisma.SortOrder;
    lastActivityAt?: Prisma.SortOrder;
    hiddenAt?: Prisma.SortOrder;
    hiddenReason?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ForumThreadSumOrderByAggregateInput = {
    answersCount?: Prisma.SortOrder;
};
export type ForumThreadScalarRelationFilter = {
    is?: Prisma.ForumThreadWhereInput;
    isNot?: Prisma.ForumThreadWhereInput;
};
export type ForumThreadNullableScalarRelationFilter = {
    is?: Prisma.ForumThreadWhereInput | null;
    isNot?: Prisma.ForumThreadWhereInput | null;
};
export type ForumThreadCreateNestedManyWithoutClassInput = {
    create?: Prisma.XOR<Prisma.ForumThreadCreateWithoutClassInput, Prisma.ForumThreadUncheckedCreateWithoutClassInput> | Prisma.ForumThreadCreateWithoutClassInput[] | Prisma.ForumThreadUncheckedCreateWithoutClassInput[];
    connectOrCreate?: Prisma.ForumThreadCreateOrConnectWithoutClassInput | Prisma.ForumThreadCreateOrConnectWithoutClassInput[];
    createMany?: Prisma.ForumThreadCreateManyClassInputEnvelope;
    connect?: Prisma.ForumThreadWhereUniqueInput | Prisma.ForumThreadWhereUniqueInput[];
};
export type ForumThreadUncheckedCreateNestedManyWithoutClassInput = {
    create?: Prisma.XOR<Prisma.ForumThreadCreateWithoutClassInput, Prisma.ForumThreadUncheckedCreateWithoutClassInput> | Prisma.ForumThreadCreateWithoutClassInput[] | Prisma.ForumThreadUncheckedCreateWithoutClassInput[];
    connectOrCreate?: Prisma.ForumThreadCreateOrConnectWithoutClassInput | Prisma.ForumThreadCreateOrConnectWithoutClassInput[];
    createMany?: Prisma.ForumThreadCreateManyClassInputEnvelope;
    connect?: Prisma.ForumThreadWhereUniqueInput | Prisma.ForumThreadWhereUniqueInput[];
};
export type ForumThreadUpdateManyWithoutClassNestedInput = {
    create?: Prisma.XOR<Prisma.ForumThreadCreateWithoutClassInput, Prisma.ForumThreadUncheckedCreateWithoutClassInput> | Prisma.ForumThreadCreateWithoutClassInput[] | Prisma.ForumThreadUncheckedCreateWithoutClassInput[];
    connectOrCreate?: Prisma.ForumThreadCreateOrConnectWithoutClassInput | Prisma.ForumThreadCreateOrConnectWithoutClassInput[];
    upsert?: Prisma.ForumThreadUpsertWithWhereUniqueWithoutClassInput | Prisma.ForumThreadUpsertWithWhereUniqueWithoutClassInput[];
    createMany?: Prisma.ForumThreadCreateManyClassInputEnvelope;
    set?: Prisma.ForumThreadWhereUniqueInput | Prisma.ForumThreadWhereUniqueInput[];
    disconnect?: Prisma.ForumThreadWhereUniqueInput | Prisma.ForumThreadWhereUniqueInput[];
    delete?: Prisma.ForumThreadWhereUniqueInput | Prisma.ForumThreadWhereUniqueInput[];
    connect?: Prisma.ForumThreadWhereUniqueInput | Prisma.ForumThreadWhereUniqueInput[];
    update?: Prisma.ForumThreadUpdateWithWhereUniqueWithoutClassInput | Prisma.ForumThreadUpdateWithWhereUniqueWithoutClassInput[];
    updateMany?: Prisma.ForumThreadUpdateManyWithWhereWithoutClassInput | Prisma.ForumThreadUpdateManyWithWhereWithoutClassInput[];
    deleteMany?: Prisma.ForumThreadScalarWhereInput | Prisma.ForumThreadScalarWhereInput[];
};
export type ForumThreadUncheckedUpdateManyWithoutClassNestedInput = {
    create?: Prisma.XOR<Prisma.ForumThreadCreateWithoutClassInput, Prisma.ForumThreadUncheckedCreateWithoutClassInput> | Prisma.ForumThreadCreateWithoutClassInput[] | Prisma.ForumThreadUncheckedCreateWithoutClassInput[];
    connectOrCreate?: Prisma.ForumThreadCreateOrConnectWithoutClassInput | Prisma.ForumThreadCreateOrConnectWithoutClassInput[];
    upsert?: Prisma.ForumThreadUpsertWithWhereUniqueWithoutClassInput | Prisma.ForumThreadUpsertWithWhereUniqueWithoutClassInput[];
    createMany?: Prisma.ForumThreadCreateManyClassInputEnvelope;
    set?: Prisma.ForumThreadWhereUniqueInput | Prisma.ForumThreadWhereUniqueInput[];
    disconnect?: Prisma.ForumThreadWhereUniqueInput | Prisma.ForumThreadWhereUniqueInput[];
    delete?: Prisma.ForumThreadWhereUniqueInput | Prisma.ForumThreadWhereUniqueInput[];
    connect?: Prisma.ForumThreadWhereUniqueInput | Prisma.ForumThreadWhereUniqueInput[];
    update?: Prisma.ForumThreadUpdateWithWhereUniqueWithoutClassInput | Prisma.ForumThreadUpdateWithWhereUniqueWithoutClassInput[];
    updateMany?: Prisma.ForumThreadUpdateManyWithWhereWithoutClassInput | Prisma.ForumThreadUpdateManyWithWhereWithoutClassInput[];
    deleteMany?: Prisma.ForumThreadScalarWhereInput | Prisma.ForumThreadScalarWhereInput[];
};
export type ForumThreadCreateNestedManyWithoutClassSubjectInput = {
    create?: Prisma.XOR<Prisma.ForumThreadCreateWithoutClassSubjectInput, Prisma.ForumThreadUncheckedCreateWithoutClassSubjectInput> | Prisma.ForumThreadCreateWithoutClassSubjectInput[] | Prisma.ForumThreadUncheckedCreateWithoutClassSubjectInput[];
    connectOrCreate?: Prisma.ForumThreadCreateOrConnectWithoutClassSubjectInput | Prisma.ForumThreadCreateOrConnectWithoutClassSubjectInput[];
    createMany?: Prisma.ForumThreadCreateManyClassSubjectInputEnvelope;
    connect?: Prisma.ForumThreadWhereUniqueInput | Prisma.ForumThreadWhereUniqueInput[];
};
export type ForumThreadUncheckedCreateNestedManyWithoutClassSubjectInput = {
    create?: Prisma.XOR<Prisma.ForumThreadCreateWithoutClassSubjectInput, Prisma.ForumThreadUncheckedCreateWithoutClassSubjectInput> | Prisma.ForumThreadCreateWithoutClassSubjectInput[] | Prisma.ForumThreadUncheckedCreateWithoutClassSubjectInput[];
    connectOrCreate?: Prisma.ForumThreadCreateOrConnectWithoutClassSubjectInput | Prisma.ForumThreadCreateOrConnectWithoutClassSubjectInput[];
    createMany?: Prisma.ForumThreadCreateManyClassSubjectInputEnvelope;
    connect?: Prisma.ForumThreadWhereUniqueInput | Prisma.ForumThreadWhereUniqueInput[];
};
export type ForumThreadUpdateManyWithoutClassSubjectNestedInput = {
    create?: Prisma.XOR<Prisma.ForumThreadCreateWithoutClassSubjectInput, Prisma.ForumThreadUncheckedCreateWithoutClassSubjectInput> | Prisma.ForumThreadCreateWithoutClassSubjectInput[] | Prisma.ForumThreadUncheckedCreateWithoutClassSubjectInput[];
    connectOrCreate?: Prisma.ForumThreadCreateOrConnectWithoutClassSubjectInput | Prisma.ForumThreadCreateOrConnectWithoutClassSubjectInput[];
    upsert?: Prisma.ForumThreadUpsertWithWhereUniqueWithoutClassSubjectInput | Prisma.ForumThreadUpsertWithWhereUniqueWithoutClassSubjectInput[];
    createMany?: Prisma.ForumThreadCreateManyClassSubjectInputEnvelope;
    set?: Prisma.ForumThreadWhereUniqueInput | Prisma.ForumThreadWhereUniqueInput[];
    disconnect?: Prisma.ForumThreadWhereUniqueInput | Prisma.ForumThreadWhereUniqueInput[];
    delete?: Prisma.ForumThreadWhereUniqueInput | Prisma.ForumThreadWhereUniqueInput[];
    connect?: Prisma.ForumThreadWhereUniqueInput | Prisma.ForumThreadWhereUniqueInput[];
    update?: Prisma.ForumThreadUpdateWithWhereUniqueWithoutClassSubjectInput | Prisma.ForumThreadUpdateWithWhereUniqueWithoutClassSubjectInput[];
    updateMany?: Prisma.ForumThreadUpdateManyWithWhereWithoutClassSubjectInput | Prisma.ForumThreadUpdateManyWithWhereWithoutClassSubjectInput[];
    deleteMany?: Prisma.ForumThreadScalarWhereInput | Prisma.ForumThreadScalarWhereInput[];
};
export type ForumThreadUncheckedUpdateManyWithoutClassSubjectNestedInput = {
    create?: Prisma.XOR<Prisma.ForumThreadCreateWithoutClassSubjectInput, Prisma.ForumThreadUncheckedCreateWithoutClassSubjectInput> | Prisma.ForumThreadCreateWithoutClassSubjectInput[] | Prisma.ForumThreadUncheckedCreateWithoutClassSubjectInput[];
    connectOrCreate?: Prisma.ForumThreadCreateOrConnectWithoutClassSubjectInput | Prisma.ForumThreadCreateOrConnectWithoutClassSubjectInput[];
    upsert?: Prisma.ForumThreadUpsertWithWhereUniqueWithoutClassSubjectInput | Prisma.ForumThreadUpsertWithWhereUniqueWithoutClassSubjectInput[];
    createMany?: Prisma.ForumThreadCreateManyClassSubjectInputEnvelope;
    set?: Prisma.ForumThreadWhereUniqueInput | Prisma.ForumThreadWhereUniqueInput[];
    disconnect?: Prisma.ForumThreadWhereUniqueInput | Prisma.ForumThreadWhereUniqueInput[];
    delete?: Prisma.ForumThreadWhereUniqueInput | Prisma.ForumThreadWhereUniqueInput[];
    connect?: Prisma.ForumThreadWhereUniqueInput | Prisma.ForumThreadWhereUniqueInput[];
    update?: Prisma.ForumThreadUpdateWithWhereUniqueWithoutClassSubjectInput | Prisma.ForumThreadUpdateWithWhereUniqueWithoutClassSubjectInput[];
    updateMany?: Prisma.ForumThreadUpdateManyWithWhereWithoutClassSubjectInput | Prisma.ForumThreadUpdateManyWithWhereWithoutClassSubjectInput[];
    deleteMany?: Prisma.ForumThreadScalarWhereInput | Prisma.ForumThreadScalarWhereInput[];
};
export type ForumThreadCreateNestedManyWithoutAuthorInput = {
    create?: Prisma.XOR<Prisma.ForumThreadCreateWithoutAuthorInput, Prisma.ForumThreadUncheckedCreateWithoutAuthorInput> | Prisma.ForumThreadCreateWithoutAuthorInput[] | Prisma.ForumThreadUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.ForumThreadCreateOrConnectWithoutAuthorInput | Prisma.ForumThreadCreateOrConnectWithoutAuthorInput[];
    createMany?: Prisma.ForumThreadCreateManyAuthorInputEnvelope;
    connect?: Prisma.ForumThreadWhereUniqueInput | Prisma.ForumThreadWhereUniqueInput[];
};
export type ForumThreadUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: Prisma.XOR<Prisma.ForumThreadCreateWithoutAuthorInput, Prisma.ForumThreadUncheckedCreateWithoutAuthorInput> | Prisma.ForumThreadCreateWithoutAuthorInput[] | Prisma.ForumThreadUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.ForumThreadCreateOrConnectWithoutAuthorInput | Prisma.ForumThreadCreateOrConnectWithoutAuthorInput[];
    createMany?: Prisma.ForumThreadCreateManyAuthorInputEnvelope;
    connect?: Prisma.ForumThreadWhereUniqueInput | Prisma.ForumThreadWhereUniqueInput[];
};
export type ForumThreadUpdateManyWithoutAuthorNestedInput = {
    create?: Prisma.XOR<Prisma.ForumThreadCreateWithoutAuthorInput, Prisma.ForumThreadUncheckedCreateWithoutAuthorInput> | Prisma.ForumThreadCreateWithoutAuthorInput[] | Prisma.ForumThreadUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.ForumThreadCreateOrConnectWithoutAuthorInput | Prisma.ForumThreadCreateOrConnectWithoutAuthorInput[];
    upsert?: Prisma.ForumThreadUpsertWithWhereUniqueWithoutAuthorInput | Prisma.ForumThreadUpsertWithWhereUniqueWithoutAuthorInput[];
    createMany?: Prisma.ForumThreadCreateManyAuthorInputEnvelope;
    set?: Prisma.ForumThreadWhereUniqueInput | Prisma.ForumThreadWhereUniqueInput[];
    disconnect?: Prisma.ForumThreadWhereUniqueInput | Prisma.ForumThreadWhereUniqueInput[];
    delete?: Prisma.ForumThreadWhereUniqueInput | Prisma.ForumThreadWhereUniqueInput[];
    connect?: Prisma.ForumThreadWhereUniqueInput | Prisma.ForumThreadWhereUniqueInput[];
    update?: Prisma.ForumThreadUpdateWithWhereUniqueWithoutAuthorInput | Prisma.ForumThreadUpdateWithWhereUniqueWithoutAuthorInput[];
    updateMany?: Prisma.ForumThreadUpdateManyWithWhereWithoutAuthorInput | Prisma.ForumThreadUpdateManyWithWhereWithoutAuthorInput[];
    deleteMany?: Prisma.ForumThreadScalarWhereInput | Prisma.ForumThreadScalarWhereInput[];
};
export type ForumThreadUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: Prisma.XOR<Prisma.ForumThreadCreateWithoutAuthorInput, Prisma.ForumThreadUncheckedCreateWithoutAuthorInput> | Prisma.ForumThreadCreateWithoutAuthorInput[] | Prisma.ForumThreadUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.ForumThreadCreateOrConnectWithoutAuthorInput | Prisma.ForumThreadCreateOrConnectWithoutAuthorInput[];
    upsert?: Prisma.ForumThreadUpsertWithWhereUniqueWithoutAuthorInput | Prisma.ForumThreadUpsertWithWhereUniqueWithoutAuthorInput[];
    createMany?: Prisma.ForumThreadCreateManyAuthorInputEnvelope;
    set?: Prisma.ForumThreadWhereUniqueInput | Prisma.ForumThreadWhereUniqueInput[];
    disconnect?: Prisma.ForumThreadWhereUniqueInput | Prisma.ForumThreadWhereUniqueInput[];
    delete?: Prisma.ForumThreadWhereUniqueInput | Prisma.ForumThreadWhereUniqueInput[];
    connect?: Prisma.ForumThreadWhereUniqueInput | Prisma.ForumThreadWhereUniqueInput[];
    update?: Prisma.ForumThreadUpdateWithWhereUniqueWithoutAuthorInput | Prisma.ForumThreadUpdateWithWhereUniqueWithoutAuthorInput[];
    updateMany?: Prisma.ForumThreadUpdateManyWithWhereWithoutAuthorInput | Prisma.ForumThreadUpdateManyWithWhereWithoutAuthorInput[];
    deleteMany?: Prisma.ForumThreadScalarWhereInput | Prisma.ForumThreadScalarWhereInput[];
};
export type EnumForumStatusFieldUpdateOperationsInput = {
    set?: $Enums.ForumStatus;
};
export type ForumThreadCreateNestedOneWithoutAnswersInput = {
    create?: Prisma.XOR<Prisma.ForumThreadCreateWithoutAnswersInput, Prisma.ForumThreadUncheckedCreateWithoutAnswersInput>;
    connectOrCreate?: Prisma.ForumThreadCreateOrConnectWithoutAnswersInput;
    connect?: Prisma.ForumThreadWhereUniqueInput;
};
export type ForumThreadUpdateOneRequiredWithoutAnswersNestedInput = {
    create?: Prisma.XOR<Prisma.ForumThreadCreateWithoutAnswersInput, Prisma.ForumThreadUncheckedCreateWithoutAnswersInput>;
    connectOrCreate?: Prisma.ForumThreadCreateOrConnectWithoutAnswersInput;
    upsert?: Prisma.ForumThreadUpsertWithoutAnswersInput;
    connect?: Prisma.ForumThreadWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ForumThreadUpdateToOneWithWhereWithoutAnswersInput, Prisma.ForumThreadUpdateWithoutAnswersInput>, Prisma.ForumThreadUncheckedUpdateWithoutAnswersInput>;
};
export type ForumThreadCreateNestedOneWithoutReportsInput = {
    create?: Prisma.XOR<Prisma.ForumThreadCreateWithoutReportsInput, Prisma.ForumThreadUncheckedCreateWithoutReportsInput>;
    connectOrCreate?: Prisma.ForumThreadCreateOrConnectWithoutReportsInput;
    connect?: Prisma.ForumThreadWhereUniqueInput;
};
export type ForumThreadUpdateOneWithoutReportsNestedInput = {
    create?: Prisma.XOR<Prisma.ForumThreadCreateWithoutReportsInput, Prisma.ForumThreadUncheckedCreateWithoutReportsInput>;
    connectOrCreate?: Prisma.ForumThreadCreateOrConnectWithoutReportsInput;
    upsert?: Prisma.ForumThreadUpsertWithoutReportsInput;
    disconnect?: Prisma.ForumThreadWhereInput | boolean;
    delete?: Prisma.ForumThreadWhereInput | boolean;
    connect?: Prisma.ForumThreadWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ForumThreadUpdateToOneWithWhereWithoutReportsInput, Prisma.ForumThreadUpdateWithoutReportsInput>, Prisma.ForumThreadUncheckedUpdateWithoutReportsInput>;
};
export type ForumThreadCreateWithoutClassInput = {
    id?: string;
    title: string;
    body: string;
    status?: $Enums.ForumStatus;
    answersCount?: number;
    lastActivityAt?: Date | string;
    hiddenAt?: Date | string | null;
    hiddenReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    classSubject?: Prisma.ClassSubjectCreateNestedOneWithoutForumThreadsInput;
    author: Prisma.UserCreateNestedOneWithoutForumThreadsInput;
    answers?: Prisma.ForumAnswerCreateNestedManyWithoutThreadInput;
    reports?: Prisma.ReportCreateNestedManyWithoutThreadInput;
};
export type ForumThreadUncheckedCreateWithoutClassInput = {
    id?: string;
    classSubjectId?: string | null;
    authorId: string;
    title: string;
    body: string;
    status?: $Enums.ForumStatus;
    answersCount?: number;
    lastActivityAt?: Date | string;
    hiddenAt?: Date | string | null;
    hiddenReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    answers?: Prisma.ForumAnswerUncheckedCreateNestedManyWithoutThreadInput;
    reports?: Prisma.ReportUncheckedCreateNestedManyWithoutThreadInput;
};
export type ForumThreadCreateOrConnectWithoutClassInput = {
    where: Prisma.ForumThreadWhereUniqueInput;
    create: Prisma.XOR<Prisma.ForumThreadCreateWithoutClassInput, Prisma.ForumThreadUncheckedCreateWithoutClassInput>;
};
export type ForumThreadCreateManyClassInputEnvelope = {
    data: Prisma.ForumThreadCreateManyClassInput | Prisma.ForumThreadCreateManyClassInput[];
    skipDuplicates?: boolean;
};
export type ForumThreadUpsertWithWhereUniqueWithoutClassInput = {
    where: Prisma.ForumThreadWhereUniqueInput;
    update: Prisma.XOR<Prisma.ForumThreadUpdateWithoutClassInput, Prisma.ForumThreadUncheckedUpdateWithoutClassInput>;
    create: Prisma.XOR<Prisma.ForumThreadCreateWithoutClassInput, Prisma.ForumThreadUncheckedCreateWithoutClassInput>;
};
export type ForumThreadUpdateWithWhereUniqueWithoutClassInput = {
    where: Prisma.ForumThreadWhereUniqueInput;
    data: Prisma.XOR<Prisma.ForumThreadUpdateWithoutClassInput, Prisma.ForumThreadUncheckedUpdateWithoutClassInput>;
};
export type ForumThreadUpdateManyWithWhereWithoutClassInput = {
    where: Prisma.ForumThreadScalarWhereInput;
    data: Prisma.XOR<Prisma.ForumThreadUpdateManyMutationInput, Prisma.ForumThreadUncheckedUpdateManyWithoutClassInput>;
};
export type ForumThreadScalarWhereInput = {
    AND?: Prisma.ForumThreadScalarWhereInput | Prisma.ForumThreadScalarWhereInput[];
    OR?: Prisma.ForumThreadScalarWhereInput[];
    NOT?: Prisma.ForumThreadScalarWhereInput | Prisma.ForumThreadScalarWhereInput[];
    id?: Prisma.UuidFilter<"ForumThread"> | string;
    classId?: Prisma.UuidFilter<"ForumThread"> | string;
    classSubjectId?: Prisma.UuidNullableFilter<"ForumThread"> | string | null;
    authorId?: Prisma.UuidFilter<"ForumThread"> | string;
    title?: Prisma.StringFilter<"ForumThread"> | string;
    body?: Prisma.StringFilter<"ForumThread"> | string;
    status?: Prisma.EnumForumStatusFilter<"ForumThread"> | $Enums.ForumStatus;
    answersCount?: Prisma.IntFilter<"ForumThread"> | number;
    lastActivityAt?: Prisma.DateTimeFilter<"ForumThread"> | Date | string;
    hiddenAt?: Prisma.DateTimeNullableFilter<"ForumThread"> | Date | string | null;
    hiddenReason?: Prisma.StringNullableFilter<"ForumThread"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"ForumThread"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"ForumThread"> | Date | string;
};
export type ForumThreadCreateWithoutClassSubjectInput = {
    id?: string;
    title: string;
    body: string;
    status?: $Enums.ForumStatus;
    answersCount?: number;
    lastActivityAt?: Date | string;
    hiddenAt?: Date | string | null;
    hiddenReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    class: Prisma.ClassCreateNestedOneWithoutForumThreadsInput;
    author: Prisma.UserCreateNestedOneWithoutForumThreadsInput;
    answers?: Prisma.ForumAnswerCreateNestedManyWithoutThreadInput;
    reports?: Prisma.ReportCreateNestedManyWithoutThreadInput;
};
export type ForumThreadUncheckedCreateWithoutClassSubjectInput = {
    id?: string;
    authorId: string;
    title: string;
    body: string;
    status?: $Enums.ForumStatus;
    answersCount?: number;
    lastActivityAt?: Date | string;
    hiddenAt?: Date | string | null;
    hiddenReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    answers?: Prisma.ForumAnswerUncheckedCreateNestedManyWithoutThreadInput;
    reports?: Prisma.ReportUncheckedCreateNestedManyWithoutThreadInput;
};
export type ForumThreadCreateOrConnectWithoutClassSubjectInput = {
    where: Prisma.ForumThreadWhereUniqueInput;
    create: Prisma.XOR<Prisma.ForumThreadCreateWithoutClassSubjectInput, Prisma.ForumThreadUncheckedCreateWithoutClassSubjectInput>;
};
export type ForumThreadCreateManyClassSubjectInputEnvelope = {
    data: Prisma.ForumThreadCreateManyClassSubjectInput | Prisma.ForumThreadCreateManyClassSubjectInput[];
    skipDuplicates?: boolean;
};
export type ForumThreadUpsertWithWhereUniqueWithoutClassSubjectInput = {
    where: Prisma.ForumThreadWhereUniqueInput;
    update: Prisma.XOR<Prisma.ForumThreadUpdateWithoutClassSubjectInput, Prisma.ForumThreadUncheckedUpdateWithoutClassSubjectInput>;
    create: Prisma.XOR<Prisma.ForumThreadCreateWithoutClassSubjectInput, Prisma.ForumThreadUncheckedCreateWithoutClassSubjectInput>;
};
export type ForumThreadUpdateWithWhereUniqueWithoutClassSubjectInput = {
    where: Prisma.ForumThreadWhereUniqueInput;
    data: Prisma.XOR<Prisma.ForumThreadUpdateWithoutClassSubjectInput, Prisma.ForumThreadUncheckedUpdateWithoutClassSubjectInput>;
};
export type ForumThreadUpdateManyWithWhereWithoutClassSubjectInput = {
    where: Prisma.ForumThreadScalarWhereInput;
    data: Prisma.XOR<Prisma.ForumThreadUpdateManyMutationInput, Prisma.ForumThreadUncheckedUpdateManyWithoutClassSubjectInput>;
};
export type ForumThreadCreateWithoutAuthorInput = {
    id?: string;
    title: string;
    body: string;
    status?: $Enums.ForumStatus;
    answersCount?: number;
    lastActivityAt?: Date | string;
    hiddenAt?: Date | string | null;
    hiddenReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    class: Prisma.ClassCreateNestedOneWithoutForumThreadsInput;
    classSubject?: Prisma.ClassSubjectCreateNestedOneWithoutForumThreadsInput;
    answers?: Prisma.ForumAnswerCreateNestedManyWithoutThreadInput;
    reports?: Prisma.ReportCreateNestedManyWithoutThreadInput;
};
export type ForumThreadUncheckedCreateWithoutAuthorInput = {
    id?: string;
    classId: string;
    classSubjectId?: string | null;
    title: string;
    body: string;
    status?: $Enums.ForumStatus;
    answersCount?: number;
    lastActivityAt?: Date | string;
    hiddenAt?: Date | string | null;
    hiddenReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    answers?: Prisma.ForumAnswerUncheckedCreateNestedManyWithoutThreadInput;
    reports?: Prisma.ReportUncheckedCreateNestedManyWithoutThreadInput;
};
export type ForumThreadCreateOrConnectWithoutAuthorInput = {
    where: Prisma.ForumThreadWhereUniqueInput;
    create: Prisma.XOR<Prisma.ForumThreadCreateWithoutAuthorInput, Prisma.ForumThreadUncheckedCreateWithoutAuthorInput>;
};
export type ForumThreadCreateManyAuthorInputEnvelope = {
    data: Prisma.ForumThreadCreateManyAuthorInput | Prisma.ForumThreadCreateManyAuthorInput[];
    skipDuplicates?: boolean;
};
export type ForumThreadUpsertWithWhereUniqueWithoutAuthorInput = {
    where: Prisma.ForumThreadWhereUniqueInput;
    update: Prisma.XOR<Prisma.ForumThreadUpdateWithoutAuthorInput, Prisma.ForumThreadUncheckedUpdateWithoutAuthorInput>;
    create: Prisma.XOR<Prisma.ForumThreadCreateWithoutAuthorInput, Prisma.ForumThreadUncheckedCreateWithoutAuthorInput>;
};
export type ForumThreadUpdateWithWhereUniqueWithoutAuthorInput = {
    where: Prisma.ForumThreadWhereUniqueInput;
    data: Prisma.XOR<Prisma.ForumThreadUpdateWithoutAuthorInput, Prisma.ForumThreadUncheckedUpdateWithoutAuthorInput>;
};
export type ForumThreadUpdateManyWithWhereWithoutAuthorInput = {
    where: Prisma.ForumThreadScalarWhereInput;
    data: Prisma.XOR<Prisma.ForumThreadUpdateManyMutationInput, Prisma.ForumThreadUncheckedUpdateManyWithoutAuthorInput>;
};
export type ForumThreadCreateWithoutAnswersInput = {
    id?: string;
    title: string;
    body: string;
    status?: $Enums.ForumStatus;
    answersCount?: number;
    lastActivityAt?: Date | string;
    hiddenAt?: Date | string | null;
    hiddenReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    class: Prisma.ClassCreateNestedOneWithoutForumThreadsInput;
    classSubject?: Prisma.ClassSubjectCreateNestedOneWithoutForumThreadsInput;
    author: Prisma.UserCreateNestedOneWithoutForumThreadsInput;
    reports?: Prisma.ReportCreateNestedManyWithoutThreadInput;
};
export type ForumThreadUncheckedCreateWithoutAnswersInput = {
    id?: string;
    classId: string;
    classSubjectId?: string | null;
    authorId: string;
    title: string;
    body: string;
    status?: $Enums.ForumStatus;
    answersCount?: number;
    lastActivityAt?: Date | string;
    hiddenAt?: Date | string | null;
    hiddenReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    reports?: Prisma.ReportUncheckedCreateNestedManyWithoutThreadInput;
};
export type ForumThreadCreateOrConnectWithoutAnswersInput = {
    where: Prisma.ForumThreadWhereUniqueInput;
    create: Prisma.XOR<Prisma.ForumThreadCreateWithoutAnswersInput, Prisma.ForumThreadUncheckedCreateWithoutAnswersInput>;
};
export type ForumThreadUpsertWithoutAnswersInput = {
    update: Prisma.XOR<Prisma.ForumThreadUpdateWithoutAnswersInput, Prisma.ForumThreadUncheckedUpdateWithoutAnswersInput>;
    create: Prisma.XOR<Prisma.ForumThreadCreateWithoutAnswersInput, Prisma.ForumThreadUncheckedCreateWithoutAnswersInput>;
    where?: Prisma.ForumThreadWhereInput;
};
export type ForumThreadUpdateToOneWithWhereWithoutAnswersInput = {
    where?: Prisma.ForumThreadWhereInput;
    data: Prisma.XOR<Prisma.ForumThreadUpdateWithoutAnswersInput, Prisma.ForumThreadUncheckedUpdateWithoutAnswersInput>;
};
export type ForumThreadUpdateWithoutAnswersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumForumStatusFieldUpdateOperationsInput | $Enums.ForumStatus;
    answersCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastActivityAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hiddenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hiddenReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    class?: Prisma.ClassUpdateOneRequiredWithoutForumThreadsNestedInput;
    classSubject?: Prisma.ClassSubjectUpdateOneWithoutForumThreadsNestedInput;
    author?: Prisma.UserUpdateOneRequiredWithoutForumThreadsNestedInput;
    reports?: Prisma.ReportUpdateManyWithoutThreadNestedInput;
};
export type ForumThreadUncheckedUpdateWithoutAnswersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    classId?: Prisma.StringFieldUpdateOperationsInput | string;
    classSubjectId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumForumStatusFieldUpdateOperationsInput | $Enums.ForumStatus;
    answersCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastActivityAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hiddenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hiddenReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reports?: Prisma.ReportUncheckedUpdateManyWithoutThreadNestedInput;
};
export type ForumThreadCreateWithoutReportsInput = {
    id?: string;
    title: string;
    body: string;
    status?: $Enums.ForumStatus;
    answersCount?: number;
    lastActivityAt?: Date | string;
    hiddenAt?: Date | string | null;
    hiddenReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    class: Prisma.ClassCreateNestedOneWithoutForumThreadsInput;
    classSubject?: Prisma.ClassSubjectCreateNestedOneWithoutForumThreadsInput;
    author: Prisma.UserCreateNestedOneWithoutForumThreadsInput;
    answers?: Prisma.ForumAnswerCreateNestedManyWithoutThreadInput;
};
export type ForumThreadUncheckedCreateWithoutReportsInput = {
    id?: string;
    classId: string;
    classSubjectId?: string | null;
    authorId: string;
    title: string;
    body: string;
    status?: $Enums.ForumStatus;
    answersCount?: number;
    lastActivityAt?: Date | string;
    hiddenAt?: Date | string | null;
    hiddenReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    answers?: Prisma.ForumAnswerUncheckedCreateNestedManyWithoutThreadInput;
};
export type ForumThreadCreateOrConnectWithoutReportsInput = {
    where: Prisma.ForumThreadWhereUniqueInput;
    create: Prisma.XOR<Prisma.ForumThreadCreateWithoutReportsInput, Prisma.ForumThreadUncheckedCreateWithoutReportsInput>;
};
export type ForumThreadUpsertWithoutReportsInput = {
    update: Prisma.XOR<Prisma.ForumThreadUpdateWithoutReportsInput, Prisma.ForumThreadUncheckedUpdateWithoutReportsInput>;
    create: Prisma.XOR<Prisma.ForumThreadCreateWithoutReportsInput, Prisma.ForumThreadUncheckedCreateWithoutReportsInput>;
    where?: Prisma.ForumThreadWhereInput;
};
export type ForumThreadUpdateToOneWithWhereWithoutReportsInput = {
    where?: Prisma.ForumThreadWhereInput;
    data: Prisma.XOR<Prisma.ForumThreadUpdateWithoutReportsInput, Prisma.ForumThreadUncheckedUpdateWithoutReportsInput>;
};
export type ForumThreadUpdateWithoutReportsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumForumStatusFieldUpdateOperationsInput | $Enums.ForumStatus;
    answersCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastActivityAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hiddenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hiddenReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    class?: Prisma.ClassUpdateOneRequiredWithoutForumThreadsNestedInput;
    classSubject?: Prisma.ClassSubjectUpdateOneWithoutForumThreadsNestedInput;
    author?: Prisma.UserUpdateOneRequiredWithoutForumThreadsNestedInput;
    answers?: Prisma.ForumAnswerUpdateManyWithoutThreadNestedInput;
};
export type ForumThreadUncheckedUpdateWithoutReportsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    classId?: Prisma.StringFieldUpdateOperationsInput | string;
    classSubjectId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumForumStatusFieldUpdateOperationsInput | $Enums.ForumStatus;
    answersCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastActivityAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hiddenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hiddenReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    answers?: Prisma.ForumAnswerUncheckedUpdateManyWithoutThreadNestedInput;
};
export type ForumThreadCreateManyClassInput = {
    id?: string;
    classSubjectId?: string | null;
    authorId: string;
    title: string;
    body: string;
    status?: $Enums.ForumStatus;
    answersCount?: number;
    lastActivityAt?: Date | string;
    hiddenAt?: Date | string | null;
    hiddenReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ForumThreadUpdateWithoutClassInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumForumStatusFieldUpdateOperationsInput | $Enums.ForumStatus;
    answersCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastActivityAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hiddenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hiddenReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    classSubject?: Prisma.ClassSubjectUpdateOneWithoutForumThreadsNestedInput;
    author?: Prisma.UserUpdateOneRequiredWithoutForumThreadsNestedInput;
    answers?: Prisma.ForumAnswerUpdateManyWithoutThreadNestedInput;
    reports?: Prisma.ReportUpdateManyWithoutThreadNestedInput;
};
export type ForumThreadUncheckedUpdateWithoutClassInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    classSubjectId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumForumStatusFieldUpdateOperationsInput | $Enums.ForumStatus;
    answersCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastActivityAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hiddenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hiddenReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    answers?: Prisma.ForumAnswerUncheckedUpdateManyWithoutThreadNestedInput;
    reports?: Prisma.ReportUncheckedUpdateManyWithoutThreadNestedInput;
};
export type ForumThreadUncheckedUpdateManyWithoutClassInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    classSubjectId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumForumStatusFieldUpdateOperationsInput | $Enums.ForumStatus;
    answersCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastActivityAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hiddenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hiddenReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ForumThreadCreateManyClassSubjectInput = {
    id?: string;
    authorId: string;
    title: string;
    body: string;
    status?: $Enums.ForumStatus;
    answersCount?: number;
    lastActivityAt?: Date | string;
    hiddenAt?: Date | string | null;
    hiddenReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ForumThreadUpdateWithoutClassSubjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumForumStatusFieldUpdateOperationsInput | $Enums.ForumStatus;
    answersCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastActivityAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hiddenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hiddenReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    class?: Prisma.ClassUpdateOneRequiredWithoutForumThreadsNestedInput;
    author?: Prisma.UserUpdateOneRequiredWithoutForumThreadsNestedInput;
    answers?: Prisma.ForumAnswerUpdateManyWithoutThreadNestedInput;
    reports?: Prisma.ReportUpdateManyWithoutThreadNestedInput;
};
export type ForumThreadUncheckedUpdateWithoutClassSubjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumForumStatusFieldUpdateOperationsInput | $Enums.ForumStatus;
    answersCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastActivityAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hiddenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hiddenReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    answers?: Prisma.ForumAnswerUncheckedUpdateManyWithoutThreadNestedInput;
    reports?: Prisma.ReportUncheckedUpdateManyWithoutThreadNestedInput;
};
export type ForumThreadUncheckedUpdateManyWithoutClassSubjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumForumStatusFieldUpdateOperationsInput | $Enums.ForumStatus;
    answersCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastActivityAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hiddenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hiddenReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ForumThreadCreateManyAuthorInput = {
    id?: string;
    classId: string;
    classSubjectId?: string | null;
    title: string;
    body: string;
    status?: $Enums.ForumStatus;
    answersCount?: number;
    lastActivityAt?: Date | string;
    hiddenAt?: Date | string | null;
    hiddenReason?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ForumThreadUpdateWithoutAuthorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumForumStatusFieldUpdateOperationsInput | $Enums.ForumStatus;
    answersCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastActivityAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hiddenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hiddenReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    class?: Prisma.ClassUpdateOneRequiredWithoutForumThreadsNestedInput;
    classSubject?: Prisma.ClassSubjectUpdateOneWithoutForumThreadsNestedInput;
    answers?: Prisma.ForumAnswerUpdateManyWithoutThreadNestedInput;
    reports?: Prisma.ReportUpdateManyWithoutThreadNestedInput;
};
export type ForumThreadUncheckedUpdateWithoutAuthorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    classId?: Prisma.StringFieldUpdateOperationsInput | string;
    classSubjectId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumForumStatusFieldUpdateOperationsInput | $Enums.ForumStatus;
    answersCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastActivityAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hiddenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hiddenReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    answers?: Prisma.ForumAnswerUncheckedUpdateManyWithoutThreadNestedInput;
    reports?: Prisma.ReportUncheckedUpdateManyWithoutThreadNestedInput;
};
export type ForumThreadUncheckedUpdateManyWithoutAuthorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    classId?: Prisma.StringFieldUpdateOperationsInput | string;
    classSubjectId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    body?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumForumStatusFieldUpdateOperationsInput | $Enums.ForumStatus;
    answersCount?: Prisma.IntFieldUpdateOperationsInput | number;
    lastActivityAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    hiddenAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    hiddenReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ForumThreadCountOutputType = {
    answers: number;
    reports: number;
};
export type ForumThreadCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    answers?: boolean | ForumThreadCountOutputTypeCountAnswersArgs;
    reports?: boolean | ForumThreadCountOutputTypeCountReportsArgs;
};
export type ForumThreadCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ForumThreadCountOutputTypeSelect<ExtArgs> | null;
};
export type ForumThreadCountOutputTypeCountAnswersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ForumAnswerWhereInput;
};
export type ForumThreadCountOutputTypeCountReportsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ReportWhereInput;
};
export type ForumThreadSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    classId?: boolean;
    classSubjectId?: boolean;
    authorId?: boolean;
    title?: boolean;
    body?: boolean;
    status?: boolean;
    answersCount?: boolean;
    lastActivityAt?: boolean;
    hiddenAt?: boolean;
    hiddenReason?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    class?: boolean | Prisma.ClassDefaultArgs<ExtArgs>;
    classSubject?: boolean | Prisma.ForumThread$classSubjectArgs<ExtArgs>;
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    answers?: boolean | Prisma.ForumThread$answersArgs<ExtArgs>;
    reports?: boolean | Prisma.ForumThread$reportsArgs<ExtArgs>;
    _count?: boolean | Prisma.ForumThreadCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["forumThread"]>;
export type ForumThreadSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    classId?: boolean;
    classSubjectId?: boolean;
    authorId?: boolean;
    title?: boolean;
    body?: boolean;
    status?: boolean;
    answersCount?: boolean;
    lastActivityAt?: boolean;
    hiddenAt?: boolean;
    hiddenReason?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    class?: boolean | Prisma.ClassDefaultArgs<ExtArgs>;
    classSubject?: boolean | Prisma.ForumThread$classSubjectArgs<ExtArgs>;
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["forumThread"]>;
export type ForumThreadSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    classId?: boolean;
    classSubjectId?: boolean;
    authorId?: boolean;
    title?: boolean;
    body?: boolean;
    status?: boolean;
    answersCount?: boolean;
    lastActivityAt?: boolean;
    hiddenAt?: boolean;
    hiddenReason?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    class?: boolean | Prisma.ClassDefaultArgs<ExtArgs>;
    classSubject?: boolean | Prisma.ForumThread$classSubjectArgs<ExtArgs>;
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["forumThread"]>;
export type ForumThreadSelectScalar = {
    id?: boolean;
    classId?: boolean;
    classSubjectId?: boolean;
    authorId?: boolean;
    title?: boolean;
    body?: boolean;
    status?: boolean;
    answersCount?: boolean;
    lastActivityAt?: boolean;
    hiddenAt?: boolean;
    hiddenReason?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ForumThreadOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "classId" | "classSubjectId" | "authorId" | "title" | "body" | "status" | "answersCount" | "lastActivityAt" | "hiddenAt" | "hiddenReason" | "createdAt" | "updatedAt", ExtArgs["result"]["forumThread"]>;
export type ForumThreadInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    class?: boolean | Prisma.ClassDefaultArgs<ExtArgs>;
    classSubject?: boolean | Prisma.ForumThread$classSubjectArgs<ExtArgs>;
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    answers?: boolean | Prisma.ForumThread$answersArgs<ExtArgs>;
    reports?: boolean | Prisma.ForumThread$reportsArgs<ExtArgs>;
    _count?: boolean | Prisma.ForumThreadCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ForumThreadIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    class?: boolean | Prisma.ClassDefaultArgs<ExtArgs>;
    classSubject?: boolean | Prisma.ForumThread$classSubjectArgs<ExtArgs>;
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ForumThreadIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    class?: boolean | Prisma.ClassDefaultArgs<ExtArgs>;
    classSubject?: boolean | Prisma.ForumThread$classSubjectArgs<ExtArgs>;
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $ForumThreadPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ForumThread";
    objects: {
        class: Prisma.$ClassPayload<ExtArgs>;
        classSubject: Prisma.$ClassSubjectPayload<ExtArgs> | null;
        author: Prisma.$UserPayload<ExtArgs>;
        answers: Prisma.$ForumAnswerPayload<ExtArgs>[];
        reports: Prisma.$ReportPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        classId: string;
        classSubjectId: string | null;
        authorId: string;
        title: string;
        body: string;
        status: $Enums.ForumStatus;
        answersCount: number;
        lastActivityAt: Date;
        hiddenAt: Date | null;
        hiddenReason: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["forumThread"]>;
    composites: {};
};
export type ForumThreadGetPayload<S extends boolean | null | undefined | ForumThreadDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ForumThreadPayload, S>;
export type ForumThreadCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ForumThreadFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ForumThreadCountAggregateInputType | true;
};
export interface ForumThreadDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ForumThread'];
        meta: {
            name: 'ForumThread';
        };
    };
    findUnique<T extends ForumThreadFindUniqueArgs>(args: Prisma.SelectSubset<T, ForumThreadFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ForumThreadClient<runtime.Types.Result.GetResult<Prisma.$ForumThreadPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ForumThreadFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ForumThreadFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ForumThreadClient<runtime.Types.Result.GetResult<Prisma.$ForumThreadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ForumThreadFindFirstArgs>(args?: Prisma.SelectSubset<T, ForumThreadFindFirstArgs<ExtArgs>>): Prisma.Prisma__ForumThreadClient<runtime.Types.Result.GetResult<Prisma.$ForumThreadPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ForumThreadFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ForumThreadFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ForumThreadClient<runtime.Types.Result.GetResult<Prisma.$ForumThreadPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ForumThreadFindManyArgs>(args?: Prisma.SelectSubset<T, ForumThreadFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ForumThreadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ForumThreadCreateArgs>(args: Prisma.SelectSubset<T, ForumThreadCreateArgs<ExtArgs>>): Prisma.Prisma__ForumThreadClient<runtime.Types.Result.GetResult<Prisma.$ForumThreadPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ForumThreadCreateManyArgs>(args?: Prisma.SelectSubset<T, ForumThreadCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ForumThreadCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ForumThreadCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ForumThreadPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ForumThreadDeleteArgs>(args: Prisma.SelectSubset<T, ForumThreadDeleteArgs<ExtArgs>>): Prisma.Prisma__ForumThreadClient<runtime.Types.Result.GetResult<Prisma.$ForumThreadPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ForumThreadUpdateArgs>(args: Prisma.SelectSubset<T, ForumThreadUpdateArgs<ExtArgs>>): Prisma.Prisma__ForumThreadClient<runtime.Types.Result.GetResult<Prisma.$ForumThreadPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ForumThreadDeleteManyArgs>(args?: Prisma.SelectSubset<T, ForumThreadDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ForumThreadUpdateManyArgs>(args: Prisma.SelectSubset<T, ForumThreadUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ForumThreadUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ForumThreadUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ForumThreadPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ForumThreadUpsertArgs>(args: Prisma.SelectSubset<T, ForumThreadUpsertArgs<ExtArgs>>): Prisma.Prisma__ForumThreadClient<runtime.Types.Result.GetResult<Prisma.$ForumThreadPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ForumThreadCountArgs>(args?: Prisma.Subset<T, ForumThreadCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ForumThreadCountAggregateOutputType> : number>;
    aggregate<T extends ForumThreadAggregateArgs>(args: Prisma.Subset<T, ForumThreadAggregateArgs>): Prisma.PrismaPromise<GetForumThreadAggregateType<T>>;
    groupBy<T extends ForumThreadGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ForumThreadGroupByArgs['orderBy'];
    } : {
        orderBy?: ForumThreadGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ForumThreadGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetForumThreadGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ForumThreadFieldRefs;
}
export interface Prisma__ForumThreadClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    class<T extends Prisma.ClassDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ClassDefaultArgs<ExtArgs>>): Prisma.Prisma__ClassClient<runtime.Types.Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    classSubject<T extends Prisma.ForumThread$classSubjectArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ForumThread$classSubjectArgs<ExtArgs>>): Prisma.Prisma__ClassSubjectClient<runtime.Types.Result.GetResult<Prisma.$ClassSubjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    author<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    answers<T extends Prisma.ForumThread$answersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ForumThread$answersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ForumAnswerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    reports<T extends Prisma.ForumThread$reportsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ForumThread$reportsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ReportPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ForumThreadFieldRefs {
    readonly id: Prisma.FieldRef<"ForumThread", 'String'>;
    readonly classId: Prisma.FieldRef<"ForumThread", 'String'>;
    readonly classSubjectId: Prisma.FieldRef<"ForumThread", 'String'>;
    readonly authorId: Prisma.FieldRef<"ForumThread", 'String'>;
    readonly title: Prisma.FieldRef<"ForumThread", 'String'>;
    readonly body: Prisma.FieldRef<"ForumThread", 'String'>;
    readonly status: Prisma.FieldRef<"ForumThread", 'ForumStatus'>;
    readonly answersCount: Prisma.FieldRef<"ForumThread", 'Int'>;
    readonly lastActivityAt: Prisma.FieldRef<"ForumThread", 'DateTime'>;
    readonly hiddenAt: Prisma.FieldRef<"ForumThread", 'DateTime'>;
    readonly hiddenReason: Prisma.FieldRef<"ForumThread", 'String'>;
    readonly createdAt: Prisma.FieldRef<"ForumThread", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"ForumThread", 'DateTime'>;
}
export type ForumThreadFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ForumThreadSelect<ExtArgs> | null;
    omit?: Prisma.ForumThreadOmit<ExtArgs> | null;
    include?: Prisma.ForumThreadInclude<ExtArgs> | null;
    where: Prisma.ForumThreadWhereUniqueInput;
};
export type ForumThreadFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ForumThreadSelect<ExtArgs> | null;
    omit?: Prisma.ForumThreadOmit<ExtArgs> | null;
    include?: Prisma.ForumThreadInclude<ExtArgs> | null;
    where: Prisma.ForumThreadWhereUniqueInput;
};
export type ForumThreadFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ForumThreadSelect<ExtArgs> | null;
    omit?: Prisma.ForumThreadOmit<ExtArgs> | null;
    include?: Prisma.ForumThreadInclude<ExtArgs> | null;
    where?: Prisma.ForumThreadWhereInput;
    orderBy?: Prisma.ForumThreadOrderByWithRelationInput | Prisma.ForumThreadOrderByWithRelationInput[];
    cursor?: Prisma.ForumThreadWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ForumThreadScalarFieldEnum | Prisma.ForumThreadScalarFieldEnum[];
};
export type ForumThreadFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ForumThreadSelect<ExtArgs> | null;
    omit?: Prisma.ForumThreadOmit<ExtArgs> | null;
    include?: Prisma.ForumThreadInclude<ExtArgs> | null;
    where?: Prisma.ForumThreadWhereInput;
    orderBy?: Prisma.ForumThreadOrderByWithRelationInput | Prisma.ForumThreadOrderByWithRelationInput[];
    cursor?: Prisma.ForumThreadWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ForumThreadScalarFieldEnum | Prisma.ForumThreadScalarFieldEnum[];
};
export type ForumThreadFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ForumThreadSelect<ExtArgs> | null;
    omit?: Prisma.ForumThreadOmit<ExtArgs> | null;
    include?: Prisma.ForumThreadInclude<ExtArgs> | null;
    where?: Prisma.ForumThreadWhereInput;
    orderBy?: Prisma.ForumThreadOrderByWithRelationInput | Prisma.ForumThreadOrderByWithRelationInput[];
    cursor?: Prisma.ForumThreadWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ForumThreadScalarFieldEnum | Prisma.ForumThreadScalarFieldEnum[];
};
export type ForumThreadCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ForumThreadSelect<ExtArgs> | null;
    omit?: Prisma.ForumThreadOmit<ExtArgs> | null;
    include?: Prisma.ForumThreadInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ForumThreadCreateInput, Prisma.ForumThreadUncheckedCreateInput>;
};
export type ForumThreadCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ForumThreadCreateManyInput | Prisma.ForumThreadCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ForumThreadCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ForumThreadSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ForumThreadOmit<ExtArgs> | null;
    data: Prisma.ForumThreadCreateManyInput | Prisma.ForumThreadCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ForumThreadIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ForumThreadUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ForumThreadSelect<ExtArgs> | null;
    omit?: Prisma.ForumThreadOmit<ExtArgs> | null;
    include?: Prisma.ForumThreadInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ForumThreadUpdateInput, Prisma.ForumThreadUncheckedUpdateInput>;
    where: Prisma.ForumThreadWhereUniqueInput;
};
export type ForumThreadUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ForumThreadUpdateManyMutationInput, Prisma.ForumThreadUncheckedUpdateManyInput>;
    where?: Prisma.ForumThreadWhereInput;
    limit?: number;
};
export type ForumThreadUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ForumThreadSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ForumThreadOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ForumThreadUpdateManyMutationInput, Prisma.ForumThreadUncheckedUpdateManyInput>;
    where?: Prisma.ForumThreadWhereInput;
    limit?: number;
    include?: Prisma.ForumThreadIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ForumThreadUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ForumThreadSelect<ExtArgs> | null;
    omit?: Prisma.ForumThreadOmit<ExtArgs> | null;
    include?: Prisma.ForumThreadInclude<ExtArgs> | null;
    where: Prisma.ForumThreadWhereUniqueInput;
    create: Prisma.XOR<Prisma.ForumThreadCreateInput, Prisma.ForumThreadUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ForumThreadUpdateInput, Prisma.ForumThreadUncheckedUpdateInput>;
};
export type ForumThreadDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ForumThreadSelect<ExtArgs> | null;
    omit?: Prisma.ForumThreadOmit<ExtArgs> | null;
    include?: Prisma.ForumThreadInclude<ExtArgs> | null;
    where: Prisma.ForumThreadWhereUniqueInput;
};
export type ForumThreadDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ForumThreadWhereInput;
    limit?: number;
};
export type ForumThread$classSubjectArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ClassSubjectSelect<ExtArgs> | null;
    omit?: Prisma.ClassSubjectOmit<ExtArgs> | null;
    include?: Prisma.ClassSubjectInclude<ExtArgs> | null;
    where?: Prisma.ClassSubjectWhereInput;
};
export type ForumThread$answersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ForumAnswerSelect<ExtArgs> | null;
    omit?: Prisma.ForumAnswerOmit<ExtArgs> | null;
    include?: Prisma.ForumAnswerInclude<ExtArgs> | null;
    where?: Prisma.ForumAnswerWhereInput;
    orderBy?: Prisma.ForumAnswerOrderByWithRelationInput | Prisma.ForumAnswerOrderByWithRelationInput[];
    cursor?: Prisma.ForumAnswerWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ForumAnswerScalarFieldEnum | Prisma.ForumAnswerScalarFieldEnum[];
};
export type ForumThread$reportsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ForumThreadDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ForumThreadSelect<ExtArgs> | null;
    omit?: Prisma.ForumThreadOmit<ExtArgs> | null;
    include?: Prisma.ForumThreadInclude<ExtArgs> | null;
};
