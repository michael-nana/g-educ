import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ChapterModel = runtime.Types.Result.DefaultSelection<Prisma.$ChapterPayload>;
export type AggregateChapter = {
    _count: ChapterCountAggregateOutputType | null;
    _avg: ChapterAvgAggregateOutputType | null;
    _sum: ChapterSumAggregateOutputType | null;
    _min: ChapterMinAggregateOutputType | null;
    _max: ChapterMaxAggregateOutputType | null;
};
export type ChapterAvgAggregateOutputType = {
    position: number | null;
    version: number | null;
};
export type ChapterSumAggregateOutputType = {
    position: number | null;
    version: number | null;
};
export type ChapterMinAggregateOutputType = {
    id: string | null;
    classSubjectId: string | null;
    classId: string | null;
    title: string | null;
    description: string | null;
    position: number | null;
    status: $Enums.ContentStatus | null;
    version: number | null;
    createdById: string | null;
    publishedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ChapterMaxAggregateOutputType = {
    id: string | null;
    classSubjectId: string | null;
    classId: string | null;
    title: string | null;
    description: string | null;
    position: number | null;
    status: $Enums.ContentStatus | null;
    version: number | null;
    createdById: string | null;
    publishedAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ChapterCountAggregateOutputType = {
    id: number;
    classSubjectId: number;
    classId: number;
    title: number;
    description: number;
    position: number;
    status: number;
    version: number;
    createdById: number;
    publishedAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ChapterAvgAggregateInputType = {
    position?: true;
    version?: true;
};
export type ChapterSumAggregateInputType = {
    position?: true;
    version?: true;
};
export type ChapterMinAggregateInputType = {
    id?: true;
    classSubjectId?: true;
    classId?: true;
    title?: true;
    description?: true;
    position?: true;
    status?: true;
    version?: true;
    createdById?: true;
    publishedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ChapterMaxAggregateInputType = {
    id?: true;
    classSubjectId?: true;
    classId?: true;
    title?: true;
    description?: true;
    position?: true;
    status?: true;
    version?: true;
    createdById?: true;
    publishedAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ChapterCountAggregateInputType = {
    id?: true;
    classSubjectId?: true;
    classId?: true;
    title?: true;
    description?: true;
    position?: true;
    status?: true;
    version?: true;
    createdById?: true;
    publishedAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ChapterAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ChapterWhereInput;
    orderBy?: Prisma.ChapterOrderByWithRelationInput | Prisma.ChapterOrderByWithRelationInput[];
    cursor?: Prisma.ChapterWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ChapterCountAggregateInputType;
    _avg?: ChapterAvgAggregateInputType;
    _sum?: ChapterSumAggregateInputType;
    _min?: ChapterMinAggregateInputType;
    _max?: ChapterMaxAggregateInputType;
};
export type GetChapterAggregateType<T extends ChapterAggregateArgs> = {
    [P in keyof T & keyof AggregateChapter]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateChapter[P]> : Prisma.GetScalarType<T[P], AggregateChapter[P]>;
};
export type ChapterGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ChapterWhereInput;
    orderBy?: Prisma.ChapterOrderByWithAggregationInput | Prisma.ChapterOrderByWithAggregationInput[];
    by: Prisma.ChapterScalarFieldEnum[] | Prisma.ChapterScalarFieldEnum;
    having?: Prisma.ChapterScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ChapterCountAggregateInputType | true;
    _avg?: ChapterAvgAggregateInputType;
    _sum?: ChapterSumAggregateInputType;
    _min?: ChapterMinAggregateInputType;
    _max?: ChapterMaxAggregateInputType;
};
export type ChapterGroupByOutputType = {
    id: string;
    classSubjectId: string;
    classId: string;
    title: string;
    description: string | null;
    position: number;
    status: $Enums.ContentStatus;
    version: number;
    createdById: string;
    publishedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: ChapterCountAggregateOutputType | null;
    _avg: ChapterAvgAggregateOutputType | null;
    _sum: ChapterSumAggregateOutputType | null;
    _min: ChapterMinAggregateOutputType | null;
    _max: ChapterMaxAggregateOutputType | null;
};
export type GetChapterGroupByPayload<T extends ChapterGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ChapterGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ChapterGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ChapterGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ChapterGroupByOutputType[P]>;
}>>;
export type ChapterWhereInput = {
    AND?: Prisma.ChapterWhereInput | Prisma.ChapterWhereInput[];
    OR?: Prisma.ChapterWhereInput[];
    NOT?: Prisma.ChapterWhereInput | Prisma.ChapterWhereInput[];
    id?: Prisma.UuidFilter<"Chapter"> | string;
    classSubjectId?: Prisma.UuidFilter<"Chapter"> | string;
    classId?: Prisma.UuidFilter<"Chapter"> | string;
    title?: Prisma.StringFilter<"Chapter"> | string;
    description?: Prisma.StringNullableFilter<"Chapter"> | string | null;
    position?: Prisma.IntFilter<"Chapter"> | number;
    status?: Prisma.EnumContentStatusFilter<"Chapter"> | $Enums.ContentStatus;
    version?: Prisma.IntFilter<"Chapter"> | number;
    createdById?: Prisma.UuidFilter<"Chapter"> | string;
    publishedAt?: Prisma.DateTimeNullableFilter<"Chapter"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Chapter"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Chapter"> | Date | string;
    classSubject?: Prisma.XOR<Prisma.ClassSubjectScalarRelationFilter, Prisma.ClassSubjectWhereInput>;
    createdBy?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    lessons?: Prisma.LessonListRelationFilter;
    assessments?: Prisma.AssessmentListRelationFilter;
};
export type ChapterOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    classSubjectId?: Prisma.SortOrder;
    classId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    position?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    classSubject?: Prisma.ClassSubjectOrderByWithRelationInput;
    createdBy?: Prisma.UserOrderByWithRelationInput;
    lessons?: Prisma.LessonOrderByRelationAggregateInput;
    assessments?: Prisma.AssessmentOrderByRelationAggregateInput;
};
export type ChapterWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    id_classId?: Prisma.ChapterIdClassIdCompoundUniqueInput;
    AND?: Prisma.ChapterWhereInput | Prisma.ChapterWhereInput[];
    OR?: Prisma.ChapterWhereInput[];
    NOT?: Prisma.ChapterWhereInput | Prisma.ChapterWhereInput[];
    classSubjectId?: Prisma.UuidFilter<"Chapter"> | string;
    classId?: Prisma.UuidFilter<"Chapter"> | string;
    title?: Prisma.StringFilter<"Chapter"> | string;
    description?: Prisma.StringNullableFilter<"Chapter"> | string | null;
    position?: Prisma.IntFilter<"Chapter"> | number;
    status?: Prisma.EnumContentStatusFilter<"Chapter"> | $Enums.ContentStatus;
    version?: Prisma.IntFilter<"Chapter"> | number;
    createdById?: Prisma.UuidFilter<"Chapter"> | string;
    publishedAt?: Prisma.DateTimeNullableFilter<"Chapter"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Chapter"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Chapter"> | Date | string;
    classSubject?: Prisma.XOR<Prisma.ClassSubjectScalarRelationFilter, Prisma.ClassSubjectWhereInput>;
    createdBy?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    lessons?: Prisma.LessonListRelationFilter;
    assessments?: Prisma.AssessmentListRelationFilter;
}, "id" | "id_classId">;
export type ChapterOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    classSubjectId?: Prisma.SortOrder;
    classId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    position?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ChapterCountOrderByAggregateInput;
    _avg?: Prisma.ChapterAvgOrderByAggregateInput;
    _max?: Prisma.ChapterMaxOrderByAggregateInput;
    _min?: Prisma.ChapterMinOrderByAggregateInput;
    _sum?: Prisma.ChapterSumOrderByAggregateInput;
};
export type ChapterScalarWhereWithAggregatesInput = {
    AND?: Prisma.ChapterScalarWhereWithAggregatesInput | Prisma.ChapterScalarWhereWithAggregatesInput[];
    OR?: Prisma.ChapterScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ChapterScalarWhereWithAggregatesInput | Prisma.ChapterScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Chapter"> | string;
    classSubjectId?: Prisma.UuidWithAggregatesFilter<"Chapter"> | string;
    classId?: Prisma.UuidWithAggregatesFilter<"Chapter"> | string;
    title?: Prisma.StringWithAggregatesFilter<"Chapter"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"Chapter"> | string | null;
    position?: Prisma.IntWithAggregatesFilter<"Chapter"> | number;
    status?: Prisma.EnumContentStatusWithAggregatesFilter<"Chapter"> | $Enums.ContentStatus;
    version?: Prisma.IntWithAggregatesFilter<"Chapter"> | number;
    createdById?: Prisma.UuidWithAggregatesFilter<"Chapter"> | string;
    publishedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Chapter"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Chapter"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Chapter"> | Date | string;
};
export type ChapterCreateInput = {
    id?: string;
    title: string;
    description?: string | null;
    position?: number;
    status?: $Enums.ContentStatus;
    version?: number;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    classSubject: Prisma.ClassSubjectCreateNestedOneWithoutChaptersInput;
    createdBy: Prisma.UserCreateNestedOneWithoutChaptersCreatedInput;
    lessons?: Prisma.LessonCreateNestedManyWithoutChapterInput;
    assessments?: Prisma.AssessmentCreateNestedManyWithoutChapterInput;
};
export type ChapterUncheckedCreateInput = {
    id?: string;
    classSubjectId: string;
    classId: string;
    title: string;
    description?: string | null;
    position?: number;
    status?: $Enums.ContentStatus;
    version?: number;
    createdById: string;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    lessons?: Prisma.LessonUncheckedCreateNestedManyWithoutChapterInput;
    assessments?: Prisma.AssessmentUncheckedCreateNestedManyWithoutChapterInput;
};
export type ChapterUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    classSubject?: Prisma.ClassSubjectUpdateOneRequiredWithoutChaptersNestedInput;
    createdBy?: Prisma.UserUpdateOneRequiredWithoutChaptersCreatedNestedInput;
    lessons?: Prisma.LessonUpdateManyWithoutChapterNestedInput;
    assessments?: Prisma.AssessmentUpdateManyWithoutChapterNestedInput;
};
export type ChapterUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    classSubjectId?: Prisma.StringFieldUpdateOperationsInput | string;
    classId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lessons?: Prisma.LessonUncheckedUpdateManyWithoutChapterNestedInput;
    assessments?: Prisma.AssessmentUncheckedUpdateManyWithoutChapterNestedInput;
};
export type ChapterCreateManyInput = {
    id?: string;
    classSubjectId: string;
    classId: string;
    title: string;
    description?: string | null;
    position?: number;
    status?: $Enums.ContentStatus;
    version?: number;
    createdById: string;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ChapterUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChapterUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    classSubjectId?: Prisma.StringFieldUpdateOperationsInput | string;
    classId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChapterListRelationFilter = {
    every?: Prisma.ChapterWhereInput;
    some?: Prisma.ChapterWhereInput;
    none?: Prisma.ChapterWhereInput;
};
export type ChapterOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ChapterIdClassIdCompoundUniqueInput = {
    id: string;
    classId: string;
};
export type ChapterCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    classSubjectId?: Prisma.SortOrder;
    classId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ChapterAvgOrderByAggregateInput = {
    position?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
};
export type ChapterMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    classSubjectId?: Prisma.SortOrder;
    classId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ChapterMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    classSubjectId?: Prisma.SortOrder;
    classId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    createdById?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ChapterSumOrderByAggregateInput = {
    position?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
};
export type ChapterScalarRelationFilter = {
    is?: Prisma.ChapterWhereInput;
    isNot?: Prisma.ChapterWhereInput;
};
export type ChapterCreateNestedManyWithoutClassSubjectInput = {
    create?: Prisma.XOR<Prisma.ChapterCreateWithoutClassSubjectInput, Prisma.ChapterUncheckedCreateWithoutClassSubjectInput> | Prisma.ChapterCreateWithoutClassSubjectInput[] | Prisma.ChapterUncheckedCreateWithoutClassSubjectInput[];
    connectOrCreate?: Prisma.ChapterCreateOrConnectWithoutClassSubjectInput | Prisma.ChapterCreateOrConnectWithoutClassSubjectInput[];
    createMany?: Prisma.ChapterCreateManyClassSubjectInputEnvelope;
    connect?: Prisma.ChapterWhereUniqueInput | Prisma.ChapterWhereUniqueInput[];
};
export type ChapterUncheckedCreateNestedManyWithoutClassSubjectInput = {
    create?: Prisma.XOR<Prisma.ChapterCreateWithoutClassSubjectInput, Prisma.ChapterUncheckedCreateWithoutClassSubjectInput> | Prisma.ChapterCreateWithoutClassSubjectInput[] | Prisma.ChapterUncheckedCreateWithoutClassSubjectInput[];
    connectOrCreate?: Prisma.ChapterCreateOrConnectWithoutClassSubjectInput | Prisma.ChapterCreateOrConnectWithoutClassSubjectInput[];
    createMany?: Prisma.ChapterCreateManyClassSubjectInputEnvelope;
    connect?: Prisma.ChapterWhereUniqueInput | Prisma.ChapterWhereUniqueInput[];
};
export type ChapterUpdateManyWithoutClassSubjectNestedInput = {
    create?: Prisma.XOR<Prisma.ChapterCreateWithoutClassSubjectInput, Prisma.ChapterUncheckedCreateWithoutClassSubjectInput> | Prisma.ChapterCreateWithoutClassSubjectInput[] | Prisma.ChapterUncheckedCreateWithoutClassSubjectInput[];
    connectOrCreate?: Prisma.ChapterCreateOrConnectWithoutClassSubjectInput | Prisma.ChapterCreateOrConnectWithoutClassSubjectInput[];
    upsert?: Prisma.ChapterUpsertWithWhereUniqueWithoutClassSubjectInput | Prisma.ChapterUpsertWithWhereUniqueWithoutClassSubjectInput[];
    createMany?: Prisma.ChapterCreateManyClassSubjectInputEnvelope;
    set?: Prisma.ChapterWhereUniqueInput | Prisma.ChapterWhereUniqueInput[];
    disconnect?: Prisma.ChapterWhereUniqueInput | Prisma.ChapterWhereUniqueInput[];
    delete?: Prisma.ChapterWhereUniqueInput | Prisma.ChapterWhereUniqueInput[];
    connect?: Prisma.ChapterWhereUniqueInput | Prisma.ChapterWhereUniqueInput[];
    update?: Prisma.ChapterUpdateWithWhereUniqueWithoutClassSubjectInput | Prisma.ChapterUpdateWithWhereUniqueWithoutClassSubjectInput[];
    updateMany?: Prisma.ChapterUpdateManyWithWhereWithoutClassSubjectInput | Prisma.ChapterUpdateManyWithWhereWithoutClassSubjectInput[];
    deleteMany?: Prisma.ChapterScalarWhereInput | Prisma.ChapterScalarWhereInput[];
};
export type ChapterUncheckedUpdateManyWithoutClassSubjectNestedInput = {
    create?: Prisma.XOR<Prisma.ChapterCreateWithoutClassSubjectInput, Prisma.ChapterUncheckedCreateWithoutClassSubjectInput> | Prisma.ChapterCreateWithoutClassSubjectInput[] | Prisma.ChapterUncheckedCreateWithoutClassSubjectInput[];
    connectOrCreate?: Prisma.ChapterCreateOrConnectWithoutClassSubjectInput | Prisma.ChapterCreateOrConnectWithoutClassSubjectInput[];
    upsert?: Prisma.ChapterUpsertWithWhereUniqueWithoutClassSubjectInput | Prisma.ChapterUpsertWithWhereUniqueWithoutClassSubjectInput[];
    createMany?: Prisma.ChapterCreateManyClassSubjectInputEnvelope;
    set?: Prisma.ChapterWhereUniqueInput | Prisma.ChapterWhereUniqueInput[];
    disconnect?: Prisma.ChapterWhereUniqueInput | Prisma.ChapterWhereUniqueInput[];
    delete?: Prisma.ChapterWhereUniqueInput | Prisma.ChapterWhereUniqueInput[];
    connect?: Prisma.ChapterWhereUniqueInput | Prisma.ChapterWhereUniqueInput[];
    update?: Prisma.ChapterUpdateWithWhereUniqueWithoutClassSubjectInput | Prisma.ChapterUpdateWithWhereUniqueWithoutClassSubjectInput[];
    updateMany?: Prisma.ChapterUpdateManyWithWhereWithoutClassSubjectInput | Prisma.ChapterUpdateManyWithWhereWithoutClassSubjectInput[];
    deleteMany?: Prisma.ChapterScalarWhereInput | Prisma.ChapterScalarWhereInput[];
};
export type ChapterCreateNestedManyWithoutCreatedByInput = {
    create?: Prisma.XOR<Prisma.ChapterCreateWithoutCreatedByInput, Prisma.ChapterUncheckedCreateWithoutCreatedByInput> | Prisma.ChapterCreateWithoutCreatedByInput[] | Prisma.ChapterUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.ChapterCreateOrConnectWithoutCreatedByInput | Prisma.ChapterCreateOrConnectWithoutCreatedByInput[];
    createMany?: Prisma.ChapterCreateManyCreatedByInputEnvelope;
    connect?: Prisma.ChapterWhereUniqueInput | Prisma.ChapterWhereUniqueInput[];
};
export type ChapterUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: Prisma.XOR<Prisma.ChapterCreateWithoutCreatedByInput, Prisma.ChapterUncheckedCreateWithoutCreatedByInput> | Prisma.ChapterCreateWithoutCreatedByInput[] | Prisma.ChapterUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.ChapterCreateOrConnectWithoutCreatedByInput | Prisma.ChapterCreateOrConnectWithoutCreatedByInput[];
    createMany?: Prisma.ChapterCreateManyCreatedByInputEnvelope;
    connect?: Prisma.ChapterWhereUniqueInput | Prisma.ChapterWhereUniqueInput[];
};
export type ChapterUpdateManyWithoutCreatedByNestedInput = {
    create?: Prisma.XOR<Prisma.ChapterCreateWithoutCreatedByInput, Prisma.ChapterUncheckedCreateWithoutCreatedByInput> | Prisma.ChapterCreateWithoutCreatedByInput[] | Prisma.ChapterUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.ChapterCreateOrConnectWithoutCreatedByInput | Prisma.ChapterCreateOrConnectWithoutCreatedByInput[];
    upsert?: Prisma.ChapterUpsertWithWhereUniqueWithoutCreatedByInput | Prisma.ChapterUpsertWithWhereUniqueWithoutCreatedByInput[];
    createMany?: Prisma.ChapterCreateManyCreatedByInputEnvelope;
    set?: Prisma.ChapterWhereUniqueInput | Prisma.ChapterWhereUniqueInput[];
    disconnect?: Prisma.ChapterWhereUniqueInput | Prisma.ChapterWhereUniqueInput[];
    delete?: Prisma.ChapterWhereUniqueInput | Prisma.ChapterWhereUniqueInput[];
    connect?: Prisma.ChapterWhereUniqueInput | Prisma.ChapterWhereUniqueInput[];
    update?: Prisma.ChapterUpdateWithWhereUniqueWithoutCreatedByInput | Prisma.ChapterUpdateWithWhereUniqueWithoutCreatedByInput[];
    updateMany?: Prisma.ChapterUpdateManyWithWhereWithoutCreatedByInput | Prisma.ChapterUpdateManyWithWhereWithoutCreatedByInput[];
    deleteMany?: Prisma.ChapterScalarWhereInput | Prisma.ChapterScalarWhereInput[];
};
export type ChapterUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: Prisma.XOR<Prisma.ChapterCreateWithoutCreatedByInput, Prisma.ChapterUncheckedCreateWithoutCreatedByInput> | Prisma.ChapterCreateWithoutCreatedByInput[] | Prisma.ChapterUncheckedCreateWithoutCreatedByInput[];
    connectOrCreate?: Prisma.ChapterCreateOrConnectWithoutCreatedByInput | Prisma.ChapterCreateOrConnectWithoutCreatedByInput[];
    upsert?: Prisma.ChapterUpsertWithWhereUniqueWithoutCreatedByInput | Prisma.ChapterUpsertWithWhereUniqueWithoutCreatedByInput[];
    createMany?: Prisma.ChapterCreateManyCreatedByInputEnvelope;
    set?: Prisma.ChapterWhereUniqueInput | Prisma.ChapterWhereUniqueInput[];
    disconnect?: Prisma.ChapterWhereUniqueInput | Prisma.ChapterWhereUniqueInput[];
    delete?: Prisma.ChapterWhereUniqueInput | Prisma.ChapterWhereUniqueInput[];
    connect?: Prisma.ChapterWhereUniqueInput | Prisma.ChapterWhereUniqueInput[];
    update?: Prisma.ChapterUpdateWithWhereUniqueWithoutCreatedByInput | Prisma.ChapterUpdateWithWhereUniqueWithoutCreatedByInput[];
    updateMany?: Prisma.ChapterUpdateManyWithWhereWithoutCreatedByInput | Prisma.ChapterUpdateManyWithWhereWithoutCreatedByInput[];
    deleteMany?: Prisma.ChapterScalarWhereInput | Prisma.ChapterScalarWhereInput[];
};
export type EnumContentStatusFieldUpdateOperationsInput = {
    set?: $Enums.ContentStatus;
};
export type ChapterCreateNestedOneWithoutLessonsInput = {
    create?: Prisma.XOR<Prisma.ChapterCreateWithoutLessonsInput, Prisma.ChapterUncheckedCreateWithoutLessonsInput>;
    connectOrCreate?: Prisma.ChapterCreateOrConnectWithoutLessonsInput;
    connect?: Prisma.ChapterWhereUniqueInput;
};
export type ChapterUpdateOneRequiredWithoutLessonsNestedInput = {
    create?: Prisma.XOR<Prisma.ChapterCreateWithoutLessonsInput, Prisma.ChapterUncheckedCreateWithoutLessonsInput>;
    connectOrCreate?: Prisma.ChapterCreateOrConnectWithoutLessonsInput;
    upsert?: Prisma.ChapterUpsertWithoutLessonsInput;
    connect?: Prisma.ChapterWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ChapterUpdateToOneWithWhereWithoutLessonsInput, Prisma.ChapterUpdateWithoutLessonsInput>, Prisma.ChapterUncheckedUpdateWithoutLessonsInput>;
};
export type ChapterCreateNestedOneWithoutAssessmentsInput = {
    create?: Prisma.XOR<Prisma.ChapterCreateWithoutAssessmentsInput, Prisma.ChapterUncheckedCreateWithoutAssessmentsInput>;
    connectOrCreate?: Prisma.ChapterCreateOrConnectWithoutAssessmentsInput;
    connect?: Prisma.ChapterWhereUniqueInput;
};
export type ChapterUpdateOneRequiredWithoutAssessmentsNestedInput = {
    create?: Prisma.XOR<Prisma.ChapterCreateWithoutAssessmentsInput, Prisma.ChapterUncheckedCreateWithoutAssessmentsInput>;
    connectOrCreate?: Prisma.ChapterCreateOrConnectWithoutAssessmentsInput;
    upsert?: Prisma.ChapterUpsertWithoutAssessmentsInput;
    connect?: Prisma.ChapterWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ChapterUpdateToOneWithWhereWithoutAssessmentsInput, Prisma.ChapterUpdateWithoutAssessmentsInput>, Prisma.ChapterUncheckedUpdateWithoutAssessmentsInput>;
};
export type ChapterCreateWithoutClassSubjectInput = {
    id?: string;
    title: string;
    description?: string | null;
    position?: number;
    status?: $Enums.ContentStatus;
    version?: number;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    createdBy: Prisma.UserCreateNestedOneWithoutChaptersCreatedInput;
    lessons?: Prisma.LessonCreateNestedManyWithoutChapterInput;
    assessments?: Prisma.AssessmentCreateNestedManyWithoutChapterInput;
};
export type ChapterUncheckedCreateWithoutClassSubjectInput = {
    id?: string;
    title: string;
    description?: string | null;
    position?: number;
    status?: $Enums.ContentStatus;
    version?: number;
    createdById: string;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    lessons?: Prisma.LessonUncheckedCreateNestedManyWithoutChapterInput;
    assessments?: Prisma.AssessmentUncheckedCreateNestedManyWithoutChapterInput;
};
export type ChapterCreateOrConnectWithoutClassSubjectInput = {
    where: Prisma.ChapterWhereUniqueInput;
    create: Prisma.XOR<Prisma.ChapterCreateWithoutClassSubjectInput, Prisma.ChapterUncheckedCreateWithoutClassSubjectInput>;
};
export type ChapterCreateManyClassSubjectInputEnvelope = {
    data: Prisma.ChapterCreateManyClassSubjectInput | Prisma.ChapterCreateManyClassSubjectInput[];
    skipDuplicates?: boolean;
};
export type ChapterUpsertWithWhereUniqueWithoutClassSubjectInput = {
    where: Prisma.ChapterWhereUniqueInput;
    update: Prisma.XOR<Prisma.ChapterUpdateWithoutClassSubjectInput, Prisma.ChapterUncheckedUpdateWithoutClassSubjectInput>;
    create: Prisma.XOR<Prisma.ChapterCreateWithoutClassSubjectInput, Prisma.ChapterUncheckedCreateWithoutClassSubjectInput>;
};
export type ChapterUpdateWithWhereUniqueWithoutClassSubjectInput = {
    where: Prisma.ChapterWhereUniqueInput;
    data: Prisma.XOR<Prisma.ChapterUpdateWithoutClassSubjectInput, Prisma.ChapterUncheckedUpdateWithoutClassSubjectInput>;
};
export type ChapterUpdateManyWithWhereWithoutClassSubjectInput = {
    where: Prisma.ChapterScalarWhereInput;
    data: Prisma.XOR<Prisma.ChapterUpdateManyMutationInput, Prisma.ChapterUncheckedUpdateManyWithoutClassSubjectInput>;
};
export type ChapterScalarWhereInput = {
    AND?: Prisma.ChapterScalarWhereInput | Prisma.ChapterScalarWhereInput[];
    OR?: Prisma.ChapterScalarWhereInput[];
    NOT?: Prisma.ChapterScalarWhereInput | Prisma.ChapterScalarWhereInput[];
    id?: Prisma.UuidFilter<"Chapter"> | string;
    classSubjectId?: Prisma.UuidFilter<"Chapter"> | string;
    classId?: Prisma.UuidFilter<"Chapter"> | string;
    title?: Prisma.StringFilter<"Chapter"> | string;
    description?: Prisma.StringNullableFilter<"Chapter"> | string | null;
    position?: Prisma.IntFilter<"Chapter"> | number;
    status?: Prisma.EnumContentStatusFilter<"Chapter"> | $Enums.ContentStatus;
    version?: Prisma.IntFilter<"Chapter"> | number;
    createdById?: Prisma.UuidFilter<"Chapter"> | string;
    publishedAt?: Prisma.DateTimeNullableFilter<"Chapter"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"Chapter"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Chapter"> | Date | string;
};
export type ChapterCreateWithoutCreatedByInput = {
    id?: string;
    title: string;
    description?: string | null;
    position?: number;
    status?: $Enums.ContentStatus;
    version?: number;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    classSubject: Prisma.ClassSubjectCreateNestedOneWithoutChaptersInput;
    lessons?: Prisma.LessonCreateNestedManyWithoutChapterInput;
    assessments?: Prisma.AssessmentCreateNestedManyWithoutChapterInput;
};
export type ChapterUncheckedCreateWithoutCreatedByInput = {
    id?: string;
    classSubjectId: string;
    classId: string;
    title: string;
    description?: string | null;
    position?: number;
    status?: $Enums.ContentStatus;
    version?: number;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    lessons?: Prisma.LessonUncheckedCreateNestedManyWithoutChapterInput;
    assessments?: Prisma.AssessmentUncheckedCreateNestedManyWithoutChapterInput;
};
export type ChapterCreateOrConnectWithoutCreatedByInput = {
    where: Prisma.ChapterWhereUniqueInput;
    create: Prisma.XOR<Prisma.ChapterCreateWithoutCreatedByInput, Prisma.ChapterUncheckedCreateWithoutCreatedByInput>;
};
export type ChapterCreateManyCreatedByInputEnvelope = {
    data: Prisma.ChapterCreateManyCreatedByInput | Prisma.ChapterCreateManyCreatedByInput[];
    skipDuplicates?: boolean;
};
export type ChapterUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: Prisma.ChapterWhereUniqueInput;
    update: Prisma.XOR<Prisma.ChapterUpdateWithoutCreatedByInput, Prisma.ChapterUncheckedUpdateWithoutCreatedByInput>;
    create: Prisma.XOR<Prisma.ChapterCreateWithoutCreatedByInput, Prisma.ChapterUncheckedCreateWithoutCreatedByInput>;
};
export type ChapterUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: Prisma.ChapterWhereUniqueInput;
    data: Prisma.XOR<Prisma.ChapterUpdateWithoutCreatedByInput, Prisma.ChapterUncheckedUpdateWithoutCreatedByInput>;
};
export type ChapterUpdateManyWithWhereWithoutCreatedByInput = {
    where: Prisma.ChapterScalarWhereInput;
    data: Prisma.XOR<Prisma.ChapterUpdateManyMutationInput, Prisma.ChapterUncheckedUpdateManyWithoutCreatedByInput>;
};
export type ChapterCreateWithoutLessonsInput = {
    id?: string;
    title: string;
    description?: string | null;
    position?: number;
    status?: $Enums.ContentStatus;
    version?: number;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    classSubject: Prisma.ClassSubjectCreateNestedOneWithoutChaptersInput;
    createdBy: Prisma.UserCreateNestedOneWithoutChaptersCreatedInput;
    assessments?: Prisma.AssessmentCreateNestedManyWithoutChapterInput;
};
export type ChapterUncheckedCreateWithoutLessonsInput = {
    id?: string;
    classSubjectId: string;
    classId: string;
    title: string;
    description?: string | null;
    position?: number;
    status?: $Enums.ContentStatus;
    version?: number;
    createdById: string;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    assessments?: Prisma.AssessmentUncheckedCreateNestedManyWithoutChapterInput;
};
export type ChapterCreateOrConnectWithoutLessonsInput = {
    where: Prisma.ChapterWhereUniqueInput;
    create: Prisma.XOR<Prisma.ChapterCreateWithoutLessonsInput, Prisma.ChapterUncheckedCreateWithoutLessonsInput>;
};
export type ChapterUpsertWithoutLessonsInput = {
    update: Prisma.XOR<Prisma.ChapterUpdateWithoutLessonsInput, Prisma.ChapterUncheckedUpdateWithoutLessonsInput>;
    create: Prisma.XOR<Prisma.ChapterCreateWithoutLessonsInput, Prisma.ChapterUncheckedCreateWithoutLessonsInput>;
    where?: Prisma.ChapterWhereInput;
};
export type ChapterUpdateToOneWithWhereWithoutLessonsInput = {
    where?: Prisma.ChapterWhereInput;
    data: Prisma.XOR<Prisma.ChapterUpdateWithoutLessonsInput, Prisma.ChapterUncheckedUpdateWithoutLessonsInput>;
};
export type ChapterUpdateWithoutLessonsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    classSubject?: Prisma.ClassSubjectUpdateOneRequiredWithoutChaptersNestedInput;
    createdBy?: Prisma.UserUpdateOneRequiredWithoutChaptersCreatedNestedInput;
    assessments?: Prisma.AssessmentUpdateManyWithoutChapterNestedInput;
};
export type ChapterUncheckedUpdateWithoutLessonsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    classSubjectId?: Prisma.StringFieldUpdateOperationsInput | string;
    classId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    assessments?: Prisma.AssessmentUncheckedUpdateManyWithoutChapterNestedInput;
};
export type ChapterCreateWithoutAssessmentsInput = {
    id?: string;
    title: string;
    description?: string | null;
    position?: number;
    status?: $Enums.ContentStatus;
    version?: number;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    classSubject: Prisma.ClassSubjectCreateNestedOneWithoutChaptersInput;
    createdBy: Prisma.UserCreateNestedOneWithoutChaptersCreatedInput;
    lessons?: Prisma.LessonCreateNestedManyWithoutChapterInput;
};
export type ChapterUncheckedCreateWithoutAssessmentsInput = {
    id?: string;
    classSubjectId: string;
    classId: string;
    title: string;
    description?: string | null;
    position?: number;
    status?: $Enums.ContentStatus;
    version?: number;
    createdById: string;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    lessons?: Prisma.LessonUncheckedCreateNestedManyWithoutChapterInput;
};
export type ChapterCreateOrConnectWithoutAssessmentsInput = {
    where: Prisma.ChapterWhereUniqueInput;
    create: Prisma.XOR<Prisma.ChapterCreateWithoutAssessmentsInput, Prisma.ChapterUncheckedCreateWithoutAssessmentsInput>;
};
export type ChapterUpsertWithoutAssessmentsInput = {
    update: Prisma.XOR<Prisma.ChapterUpdateWithoutAssessmentsInput, Prisma.ChapterUncheckedUpdateWithoutAssessmentsInput>;
    create: Prisma.XOR<Prisma.ChapterCreateWithoutAssessmentsInput, Prisma.ChapterUncheckedCreateWithoutAssessmentsInput>;
    where?: Prisma.ChapterWhereInput;
};
export type ChapterUpdateToOneWithWhereWithoutAssessmentsInput = {
    where?: Prisma.ChapterWhereInput;
    data: Prisma.XOR<Prisma.ChapterUpdateWithoutAssessmentsInput, Prisma.ChapterUncheckedUpdateWithoutAssessmentsInput>;
};
export type ChapterUpdateWithoutAssessmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    classSubject?: Prisma.ClassSubjectUpdateOneRequiredWithoutChaptersNestedInput;
    createdBy?: Prisma.UserUpdateOneRequiredWithoutChaptersCreatedNestedInput;
    lessons?: Prisma.LessonUpdateManyWithoutChapterNestedInput;
};
export type ChapterUncheckedUpdateWithoutAssessmentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    classSubjectId?: Prisma.StringFieldUpdateOperationsInput | string;
    classId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lessons?: Prisma.LessonUncheckedUpdateManyWithoutChapterNestedInput;
};
export type ChapterCreateManyClassSubjectInput = {
    id?: string;
    title: string;
    description?: string | null;
    position?: number;
    status?: $Enums.ContentStatus;
    version?: number;
    createdById: string;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ChapterUpdateWithoutClassSubjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    createdBy?: Prisma.UserUpdateOneRequiredWithoutChaptersCreatedNestedInput;
    lessons?: Prisma.LessonUpdateManyWithoutChapterNestedInput;
    assessments?: Prisma.AssessmentUpdateManyWithoutChapterNestedInput;
};
export type ChapterUncheckedUpdateWithoutClassSubjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lessons?: Prisma.LessonUncheckedUpdateManyWithoutChapterNestedInput;
    assessments?: Prisma.AssessmentUncheckedUpdateManyWithoutChapterNestedInput;
};
export type ChapterUncheckedUpdateManyWithoutClassSubjectInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    createdById?: Prisma.StringFieldUpdateOperationsInput | string;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChapterCreateManyCreatedByInput = {
    id?: string;
    classSubjectId: string;
    classId: string;
    title: string;
    description?: string | null;
    position?: number;
    status?: $Enums.ContentStatus;
    version?: number;
    publishedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ChapterUpdateWithoutCreatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    classSubject?: Prisma.ClassSubjectUpdateOneRequiredWithoutChaptersNestedInput;
    lessons?: Prisma.LessonUpdateManyWithoutChapterNestedInput;
    assessments?: Prisma.AssessmentUpdateManyWithoutChapterNestedInput;
};
export type ChapterUncheckedUpdateWithoutCreatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    classSubjectId?: Prisma.StringFieldUpdateOperationsInput | string;
    classId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lessons?: Prisma.LessonUncheckedUpdateManyWithoutChapterNestedInput;
    assessments?: Prisma.AssessmentUncheckedUpdateManyWithoutChapterNestedInput;
};
export type ChapterUncheckedUpdateManyWithoutCreatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    classSubjectId?: Prisma.StringFieldUpdateOperationsInput | string;
    classId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    position?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumContentStatusFieldUpdateOperationsInput | $Enums.ContentStatus;
    version?: Prisma.IntFieldUpdateOperationsInput | number;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ChapterCountOutputType = {
    lessons: number;
    assessments: number;
};
export type ChapterCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lessons?: boolean | ChapterCountOutputTypeCountLessonsArgs;
    assessments?: boolean | ChapterCountOutputTypeCountAssessmentsArgs;
};
export type ChapterCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChapterCountOutputTypeSelect<ExtArgs> | null;
};
export type ChapterCountOutputTypeCountLessonsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LessonWhereInput;
};
export type ChapterCountOutputTypeCountAssessmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AssessmentWhereInput;
};
export type ChapterSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    classSubjectId?: boolean;
    classId?: boolean;
    title?: boolean;
    description?: boolean;
    position?: boolean;
    status?: boolean;
    version?: boolean;
    createdById?: boolean;
    publishedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    classSubject?: boolean | Prisma.ClassSubjectDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    lessons?: boolean | Prisma.Chapter$lessonsArgs<ExtArgs>;
    assessments?: boolean | Prisma.Chapter$assessmentsArgs<ExtArgs>;
    _count?: boolean | Prisma.ChapterCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["chapter"]>;
export type ChapterSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    classSubjectId?: boolean;
    classId?: boolean;
    title?: boolean;
    description?: boolean;
    position?: boolean;
    status?: boolean;
    version?: boolean;
    createdById?: boolean;
    publishedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    classSubject?: boolean | Prisma.ClassSubjectDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["chapter"]>;
export type ChapterSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    classSubjectId?: boolean;
    classId?: boolean;
    title?: boolean;
    description?: boolean;
    position?: boolean;
    status?: boolean;
    version?: boolean;
    createdById?: boolean;
    publishedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    classSubject?: boolean | Prisma.ClassSubjectDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["chapter"]>;
export type ChapterSelectScalar = {
    id?: boolean;
    classSubjectId?: boolean;
    classId?: boolean;
    title?: boolean;
    description?: boolean;
    position?: boolean;
    status?: boolean;
    version?: boolean;
    createdById?: boolean;
    publishedAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ChapterOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "classSubjectId" | "classId" | "title" | "description" | "position" | "status" | "version" | "createdById" | "publishedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["chapter"]>;
export type ChapterInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    classSubject?: boolean | Prisma.ClassSubjectDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    lessons?: boolean | Prisma.Chapter$lessonsArgs<ExtArgs>;
    assessments?: boolean | Prisma.Chapter$assessmentsArgs<ExtArgs>;
    _count?: boolean | Prisma.ChapterCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ChapterIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    classSubject?: boolean | Prisma.ClassSubjectDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ChapterIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    classSubject?: boolean | Prisma.ClassSubjectDefaultArgs<ExtArgs>;
    createdBy?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $ChapterPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Chapter";
    objects: {
        classSubject: Prisma.$ClassSubjectPayload<ExtArgs>;
        createdBy: Prisma.$UserPayload<ExtArgs>;
        lessons: Prisma.$LessonPayload<ExtArgs>[];
        assessments: Prisma.$AssessmentPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        classSubjectId: string;
        classId: string;
        title: string;
        description: string | null;
        position: number;
        status: $Enums.ContentStatus;
        version: number;
        createdById: string;
        publishedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["chapter"]>;
    composites: {};
};
export type ChapterGetPayload<S extends boolean | null | undefined | ChapterDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ChapterPayload, S>;
export type ChapterCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ChapterFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ChapterCountAggregateInputType | true;
};
export interface ChapterDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Chapter'];
        meta: {
            name: 'Chapter';
        };
    };
    findUnique<T extends ChapterFindUniqueArgs>(args: Prisma.SelectSubset<T, ChapterFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ChapterClient<runtime.Types.Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ChapterFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ChapterFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ChapterClient<runtime.Types.Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ChapterFindFirstArgs>(args?: Prisma.SelectSubset<T, ChapterFindFirstArgs<ExtArgs>>): Prisma.Prisma__ChapterClient<runtime.Types.Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ChapterFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ChapterFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ChapterClient<runtime.Types.Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ChapterFindManyArgs>(args?: Prisma.SelectSubset<T, ChapterFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ChapterCreateArgs>(args: Prisma.SelectSubset<T, ChapterCreateArgs<ExtArgs>>): Prisma.Prisma__ChapterClient<runtime.Types.Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ChapterCreateManyArgs>(args?: Prisma.SelectSubset<T, ChapterCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ChapterCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ChapterCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ChapterDeleteArgs>(args: Prisma.SelectSubset<T, ChapterDeleteArgs<ExtArgs>>): Prisma.Prisma__ChapterClient<runtime.Types.Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ChapterUpdateArgs>(args: Prisma.SelectSubset<T, ChapterUpdateArgs<ExtArgs>>): Prisma.Prisma__ChapterClient<runtime.Types.Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ChapterDeleteManyArgs>(args?: Prisma.SelectSubset<T, ChapterDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ChapterUpdateManyArgs>(args: Prisma.SelectSubset<T, ChapterUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ChapterUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ChapterUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ChapterUpsertArgs>(args: Prisma.SelectSubset<T, ChapterUpsertArgs<ExtArgs>>): Prisma.Prisma__ChapterClient<runtime.Types.Result.GetResult<Prisma.$ChapterPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ChapterCountArgs>(args?: Prisma.Subset<T, ChapterCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ChapterCountAggregateOutputType> : number>;
    aggregate<T extends ChapterAggregateArgs>(args: Prisma.Subset<T, ChapterAggregateArgs>): Prisma.PrismaPromise<GetChapterAggregateType<T>>;
    groupBy<T extends ChapterGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ChapterGroupByArgs['orderBy'];
    } : {
        orderBy?: ChapterGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ChapterGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChapterGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ChapterFieldRefs;
}
export interface Prisma__ChapterClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    classSubject<T extends Prisma.ClassSubjectDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ClassSubjectDefaultArgs<ExtArgs>>): Prisma.Prisma__ClassSubjectClient<runtime.Types.Result.GetResult<Prisma.$ClassSubjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    createdBy<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    lessons<T extends Prisma.Chapter$lessonsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Chapter$lessonsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    assessments<T extends Prisma.Chapter$assessmentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Chapter$assessmentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AssessmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ChapterFieldRefs {
    readonly id: Prisma.FieldRef<"Chapter", 'String'>;
    readonly classSubjectId: Prisma.FieldRef<"Chapter", 'String'>;
    readonly classId: Prisma.FieldRef<"Chapter", 'String'>;
    readonly title: Prisma.FieldRef<"Chapter", 'String'>;
    readonly description: Prisma.FieldRef<"Chapter", 'String'>;
    readonly position: Prisma.FieldRef<"Chapter", 'Int'>;
    readonly status: Prisma.FieldRef<"Chapter", 'ContentStatus'>;
    readonly version: Prisma.FieldRef<"Chapter", 'Int'>;
    readonly createdById: Prisma.FieldRef<"Chapter", 'String'>;
    readonly publishedAt: Prisma.FieldRef<"Chapter", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"Chapter", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Chapter", 'DateTime'>;
}
export type ChapterFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChapterSelect<ExtArgs> | null;
    omit?: Prisma.ChapterOmit<ExtArgs> | null;
    include?: Prisma.ChapterInclude<ExtArgs> | null;
    where: Prisma.ChapterWhereUniqueInput;
};
export type ChapterFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChapterSelect<ExtArgs> | null;
    omit?: Prisma.ChapterOmit<ExtArgs> | null;
    include?: Prisma.ChapterInclude<ExtArgs> | null;
    where: Prisma.ChapterWhereUniqueInput;
};
export type ChapterFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChapterSelect<ExtArgs> | null;
    omit?: Prisma.ChapterOmit<ExtArgs> | null;
    include?: Prisma.ChapterInclude<ExtArgs> | null;
    where?: Prisma.ChapterWhereInput;
    orderBy?: Prisma.ChapterOrderByWithRelationInput | Prisma.ChapterOrderByWithRelationInput[];
    cursor?: Prisma.ChapterWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ChapterScalarFieldEnum | Prisma.ChapterScalarFieldEnum[];
};
export type ChapterFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChapterSelect<ExtArgs> | null;
    omit?: Prisma.ChapterOmit<ExtArgs> | null;
    include?: Prisma.ChapterInclude<ExtArgs> | null;
    where?: Prisma.ChapterWhereInput;
    orderBy?: Prisma.ChapterOrderByWithRelationInput | Prisma.ChapterOrderByWithRelationInput[];
    cursor?: Prisma.ChapterWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ChapterScalarFieldEnum | Prisma.ChapterScalarFieldEnum[];
};
export type ChapterFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChapterSelect<ExtArgs> | null;
    omit?: Prisma.ChapterOmit<ExtArgs> | null;
    include?: Prisma.ChapterInclude<ExtArgs> | null;
    where?: Prisma.ChapterWhereInput;
    orderBy?: Prisma.ChapterOrderByWithRelationInput | Prisma.ChapterOrderByWithRelationInput[];
    cursor?: Prisma.ChapterWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ChapterScalarFieldEnum | Prisma.ChapterScalarFieldEnum[];
};
export type ChapterCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChapterSelect<ExtArgs> | null;
    omit?: Prisma.ChapterOmit<ExtArgs> | null;
    include?: Prisma.ChapterInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ChapterCreateInput, Prisma.ChapterUncheckedCreateInput>;
};
export type ChapterCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ChapterCreateManyInput | Prisma.ChapterCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ChapterCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChapterSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ChapterOmit<ExtArgs> | null;
    data: Prisma.ChapterCreateManyInput | Prisma.ChapterCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ChapterIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ChapterUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChapterSelect<ExtArgs> | null;
    omit?: Prisma.ChapterOmit<ExtArgs> | null;
    include?: Prisma.ChapterInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ChapterUpdateInput, Prisma.ChapterUncheckedUpdateInput>;
    where: Prisma.ChapterWhereUniqueInput;
};
export type ChapterUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ChapterUpdateManyMutationInput, Prisma.ChapterUncheckedUpdateManyInput>;
    where?: Prisma.ChapterWhereInput;
    limit?: number;
};
export type ChapterUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChapterSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ChapterOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ChapterUpdateManyMutationInput, Prisma.ChapterUncheckedUpdateManyInput>;
    where?: Prisma.ChapterWhereInput;
    limit?: number;
    include?: Prisma.ChapterIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ChapterUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChapterSelect<ExtArgs> | null;
    omit?: Prisma.ChapterOmit<ExtArgs> | null;
    include?: Prisma.ChapterInclude<ExtArgs> | null;
    where: Prisma.ChapterWhereUniqueInput;
    create: Prisma.XOR<Prisma.ChapterCreateInput, Prisma.ChapterUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ChapterUpdateInput, Prisma.ChapterUncheckedUpdateInput>;
};
export type ChapterDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChapterSelect<ExtArgs> | null;
    omit?: Prisma.ChapterOmit<ExtArgs> | null;
    include?: Prisma.ChapterInclude<ExtArgs> | null;
    where: Prisma.ChapterWhereUniqueInput;
};
export type ChapterDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ChapterWhereInput;
    limit?: number;
};
export type Chapter$lessonsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonSelect<ExtArgs> | null;
    omit?: Prisma.LessonOmit<ExtArgs> | null;
    include?: Prisma.LessonInclude<ExtArgs> | null;
    where?: Prisma.LessonWhereInput;
    orderBy?: Prisma.LessonOrderByWithRelationInput | Prisma.LessonOrderByWithRelationInput[];
    cursor?: Prisma.LessonWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LessonScalarFieldEnum | Prisma.LessonScalarFieldEnum[];
};
export type Chapter$assessmentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AssessmentSelect<ExtArgs> | null;
    omit?: Prisma.AssessmentOmit<ExtArgs> | null;
    include?: Prisma.AssessmentInclude<ExtArgs> | null;
    where?: Prisma.AssessmentWhereInput;
    orderBy?: Prisma.AssessmentOrderByWithRelationInput | Prisma.AssessmentOrderByWithRelationInput[];
    cursor?: Prisma.AssessmentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AssessmentScalarFieldEnum | Prisma.AssessmentScalarFieldEnum[];
};
export type ChapterDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ChapterSelect<ExtArgs> | null;
    omit?: Prisma.ChapterOmit<ExtArgs> | null;
    include?: Prisma.ChapterInclude<ExtArgs> | null;
};
