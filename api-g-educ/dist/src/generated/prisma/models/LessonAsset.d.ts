import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type LessonAssetModel = runtime.Types.Result.DefaultSelection<Prisma.$LessonAssetPayload>;
export type AggregateLessonAsset = {
    _count: LessonAssetCountAggregateOutputType | null;
    _avg: LessonAssetAvgAggregateOutputType | null;
    _sum: LessonAssetSumAggregateOutputType | null;
    _min: LessonAssetMinAggregateOutputType | null;
    _max: LessonAssetMaxAggregateOutputType | null;
};
export type LessonAssetAvgAggregateOutputType = {
    sizeBytes: number | null;
    durationSeconds: number | null;
};
export type LessonAssetSumAggregateOutputType = {
    sizeBytes: number | null;
    durationSeconds: number | null;
};
export type LessonAssetMinAggregateOutputType = {
    id: string | null;
    lessonId: string | null;
    kind: $Enums.AssetKind | null;
    quality: $Enums.VideoQuality | null;
    storageKey: string | null;
    mimeType: string | null;
    sizeBytes: number | null;
    durationSeconds: number | null;
    processingStatus: $Enums.AssetProcessingStatus | null;
    createdAt: Date | null;
};
export type LessonAssetMaxAggregateOutputType = {
    id: string | null;
    lessonId: string | null;
    kind: $Enums.AssetKind | null;
    quality: $Enums.VideoQuality | null;
    storageKey: string | null;
    mimeType: string | null;
    sizeBytes: number | null;
    durationSeconds: number | null;
    processingStatus: $Enums.AssetProcessingStatus | null;
    createdAt: Date | null;
};
export type LessonAssetCountAggregateOutputType = {
    id: number;
    lessonId: number;
    kind: number;
    quality: number;
    storageKey: number;
    mimeType: number;
    sizeBytes: number;
    durationSeconds: number;
    processingStatus: number;
    createdAt: number;
    _all: number;
};
export type LessonAssetAvgAggregateInputType = {
    sizeBytes?: true;
    durationSeconds?: true;
};
export type LessonAssetSumAggregateInputType = {
    sizeBytes?: true;
    durationSeconds?: true;
};
export type LessonAssetMinAggregateInputType = {
    id?: true;
    lessonId?: true;
    kind?: true;
    quality?: true;
    storageKey?: true;
    mimeType?: true;
    sizeBytes?: true;
    durationSeconds?: true;
    processingStatus?: true;
    createdAt?: true;
};
export type LessonAssetMaxAggregateInputType = {
    id?: true;
    lessonId?: true;
    kind?: true;
    quality?: true;
    storageKey?: true;
    mimeType?: true;
    sizeBytes?: true;
    durationSeconds?: true;
    processingStatus?: true;
    createdAt?: true;
};
export type LessonAssetCountAggregateInputType = {
    id?: true;
    lessonId?: true;
    kind?: true;
    quality?: true;
    storageKey?: true;
    mimeType?: true;
    sizeBytes?: true;
    durationSeconds?: true;
    processingStatus?: true;
    createdAt?: true;
    _all?: true;
};
export type LessonAssetAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LessonAssetWhereInput;
    orderBy?: Prisma.LessonAssetOrderByWithRelationInput | Prisma.LessonAssetOrderByWithRelationInput[];
    cursor?: Prisma.LessonAssetWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | LessonAssetCountAggregateInputType;
    _avg?: LessonAssetAvgAggregateInputType;
    _sum?: LessonAssetSumAggregateInputType;
    _min?: LessonAssetMinAggregateInputType;
    _max?: LessonAssetMaxAggregateInputType;
};
export type GetLessonAssetAggregateType<T extends LessonAssetAggregateArgs> = {
    [P in keyof T & keyof AggregateLessonAsset]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateLessonAsset[P]> : Prisma.GetScalarType<T[P], AggregateLessonAsset[P]>;
};
export type LessonAssetGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LessonAssetWhereInput;
    orderBy?: Prisma.LessonAssetOrderByWithAggregationInput | Prisma.LessonAssetOrderByWithAggregationInput[];
    by: Prisma.LessonAssetScalarFieldEnum[] | Prisma.LessonAssetScalarFieldEnum;
    having?: Prisma.LessonAssetScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: LessonAssetCountAggregateInputType | true;
    _avg?: LessonAssetAvgAggregateInputType;
    _sum?: LessonAssetSumAggregateInputType;
    _min?: LessonAssetMinAggregateInputType;
    _max?: LessonAssetMaxAggregateInputType;
};
export type LessonAssetGroupByOutputType = {
    id: string;
    lessonId: string;
    kind: $Enums.AssetKind;
    quality: $Enums.VideoQuality | null;
    storageKey: string;
    mimeType: string;
    sizeBytes: number;
    durationSeconds: number | null;
    processingStatus: $Enums.AssetProcessingStatus;
    createdAt: Date;
    _count: LessonAssetCountAggregateOutputType | null;
    _avg: LessonAssetAvgAggregateOutputType | null;
    _sum: LessonAssetSumAggregateOutputType | null;
    _min: LessonAssetMinAggregateOutputType | null;
    _max: LessonAssetMaxAggregateOutputType | null;
};
export type GetLessonAssetGroupByPayload<T extends LessonAssetGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<LessonAssetGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof LessonAssetGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], LessonAssetGroupByOutputType[P]> : Prisma.GetScalarType<T[P], LessonAssetGroupByOutputType[P]>;
}>>;
export type LessonAssetWhereInput = {
    AND?: Prisma.LessonAssetWhereInput | Prisma.LessonAssetWhereInput[];
    OR?: Prisma.LessonAssetWhereInput[];
    NOT?: Prisma.LessonAssetWhereInput | Prisma.LessonAssetWhereInput[];
    id?: Prisma.UuidFilter<"LessonAsset"> | string;
    lessonId?: Prisma.UuidFilter<"LessonAsset"> | string;
    kind?: Prisma.EnumAssetKindFilter<"LessonAsset"> | $Enums.AssetKind;
    quality?: Prisma.EnumVideoQualityNullableFilter<"LessonAsset"> | $Enums.VideoQuality | null;
    storageKey?: Prisma.StringFilter<"LessonAsset"> | string;
    mimeType?: Prisma.StringFilter<"LessonAsset"> | string;
    sizeBytes?: Prisma.IntFilter<"LessonAsset"> | number;
    durationSeconds?: Prisma.IntNullableFilter<"LessonAsset"> | number | null;
    processingStatus?: Prisma.EnumAssetProcessingStatusFilter<"LessonAsset"> | $Enums.AssetProcessingStatus;
    createdAt?: Prisma.DateTimeFilter<"LessonAsset"> | Date | string;
    lesson?: Prisma.XOR<Prisma.LessonScalarRelationFilter, Prisma.LessonWhereInput>;
};
export type LessonAssetOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    lessonId?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    quality?: Prisma.SortOrderInput | Prisma.SortOrder;
    storageKey?: Prisma.SortOrder;
    mimeType?: Prisma.SortOrder;
    sizeBytes?: Prisma.SortOrder;
    durationSeconds?: Prisma.SortOrderInput | Prisma.SortOrder;
    processingStatus?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    lesson?: Prisma.LessonOrderByWithRelationInput;
};
export type LessonAssetWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    storageKey?: string;
    AND?: Prisma.LessonAssetWhereInput | Prisma.LessonAssetWhereInput[];
    OR?: Prisma.LessonAssetWhereInput[];
    NOT?: Prisma.LessonAssetWhereInput | Prisma.LessonAssetWhereInput[];
    lessonId?: Prisma.UuidFilter<"LessonAsset"> | string;
    kind?: Prisma.EnumAssetKindFilter<"LessonAsset"> | $Enums.AssetKind;
    quality?: Prisma.EnumVideoQualityNullableFilter<"LessonAsset"> | $Enums.VideoQuality | null;
    mimeType?: Prisma.StringFilter<"LessonAsset"> | string;
    sizeBytes?: Prisma.IntFilter<"LessonAsset"> | number;
    durationSeconds?: Prisma.IntNullableFilter<"LessonAsset"> | number | null;
    processingStatus?: Prisma.EnumAssetProcessingStatusFilter<"LessonAsset"> | $Enums.AssetProcessingStatus;
    createdAt?: Prisma.DateTimeFilter<"LessonAsset"> | Date | string;
    lesson?: Prisma.XOR<Prisma.LessonScalarRelationFilter, Prisma.LessonWhereInput>;
}, "id" | "storageKey">;
export type LessonAssetOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    lessonId?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    quality?: Prisma.SortOrderInput | Prisma.SortOrder;
    storageKey?: Prisma.SortOrder;
    mimeType?: Prisma.SortOrder;
    sizeBytes?: Prisma.SortOrder;
    durationSeconds?: Prisma.SortOrderInput | Prisma.SortOrder;
    processingStatus?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.LessonAssetCountOrderByAggregateInput;
    _avg?: Prisma.LessonAssetAvgOrderByAggregateInput;
    _max?: Prisma.LessonAssetMaxOrderByAggregateInput;
    _min?: Prisma.LessonAssetMinOrderByAggregateInput;
    _sum?: Prisma.LessonAssetSumOrderByAggregateInput;
};
export type LessonAssetScalarWhereWithAggregatesInput = {
    AND?: Prisma.LessonAssetScalarWhereWithAggregatesInput | Prisma.LessonAssetScalarWhereWithAggregatesInput[];
    OR?: Prisma.LessonAssetScalarWhereWithAggregatesInput[];
    NOT?: Prisma.LessonAssetScalarWhereWithAggregatesInput | Prisma.LessonAssetScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"LessonAsset"> | string;
    lessonId?: Prisma.UuidWithAggregatesFilter<"LessonAsset"> | string;
    kind?: Prisma.EnumAssetKindWithAggregatesFilter<"LessonAsset"> | $Enums.AssetKind;
    quality?: Prisma.EnumVideoQualityNullableWithAggregatesFilter<"LessonAsset"> | $Enums.VideoQuality | null;
    storageKey?: Prisma.StringWithAggregatesFilter<"LessonAsset"> | string;
    mimeType?: Prisma.StringWithAggregatesFilter<"LessonAsset"> | string;
    sizeBytes?: Prisma.IntWithAggregatesFilter<"LessonAsset"> | number;
    durationSeconds?: Prisma.IntNullableWithAggregatesFilter<"LessonAsset"> | number | null;
    processingStatus?: Prisma.EnumAssetProcessingStatusWithAggregatesFilter<"LessonAsset"> | $Enums.AssetProcessingStatus;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"LessonAsset"> | Date | string;
};
export type LessonAssetCreateInput = {
    id?: string;
    kind: $Enums.AssetKind;
    quality?: $Enums.VideoQuality | null;
    storageKey: string;
    mimeType: string;
    sizeBytes: number;
    durationSeconds?: number | null;
    processingStatus?: $Enums.AssetProcessingStatus;
    createdAt?: Date | string;
    lesson: Prisma.LessonCreateNestedOneWithoutAssetsInput;
};
export type LessonAssetUncheckedCreateInput = {
    id?: string;
    lessonId: string;
    kind: $Enums.AssetKind;
    quality?: $Enums.VideoQuality | null;
    storageKey: string;
    mimeType: string;
    sizeBytes: number;
    durationSeconds?: number | null;
    processingStatus?: $Enums.AssetProcessingStatus;
    createdAt?: Date | string;
};
export type LessonAssetUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumAssetKindFieldUpdateOperationsInput | $Enums.AssetKind;
    quality?: Prisma.NullableEnumVideoQualityFieldUpdateOperationsInput | $Enums.VideoQuality | null;
    storageKey?: Prisma.StringFieldUpdateOperationsInput | string;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    sizeBytes?: Prisma.IntFieldUpdateOperationsInput | number;
    durationSeconds?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    processingStatus?: Prisma.EnumAssetProcessingStatusFieldUpdateOperationsInput | $Enums.AssetProcessingStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    lesson?: Prisma.LessonUpdateOneRequiredWithoutAssetsNestedInput;
};
export type LessonAssetUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lessonId?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumAssetKindFieldUpdateOperationsInput | $Enums.AssetKind;
    quality?: Prisma.NullableEnumVideoQualityFieldUpdateOperationsInput | $Enums.VideoQuality | null;
    storageKey?: Prisma.StringFieldUpdateOperationsInput | string;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    sizeBytes?: Prisma.IntFieldUpdateOperationsInput | number;
    durationSeconds?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    processingStatus?: Prisma.EnumAssetProcessingStatusFieldUpdateOperationsInput | $Enums.AssetProcessingStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LessonAssetCreateManyInput = {
    id?: string;
    lessonId: string;
    kind: $Enums.AssetKind;
    quality?: $Enums.VideoQuality | null;
    storageKey: string;
    mimeType: string;
    sizeBytes: number;
    durationSeconds?: number | null;
    processingStatus?: $Enums.AssetProcessingStatus;
    createdAt?: Date | string;
};
export type LessonAssetUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumAssetKindFieldUpdateOperationsInput | $Enums.AssetKind;
    quality?: Prisma.NullableEnumVideoQualityFieldUpdateOperationsInput | $Enums.VideoQuality | null;
    storageKey?: Prisma.StringFieldUpdateOperationsInput | string;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    sizeBytes?: Prisma.IntFieldUpdateOperationsInput | number;
    durationSeconds?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    processingStatus?: Prisma.EnumAssetProcessingStatusFieldUpdateOperationsInput | $Enums.AssetProcessingStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LessonAssetUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    lessonId?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumAssetKindFieldUpdateOperationsInput | $Enums.AssetKind;
    quality?: Prisma.NullableEnumVideoQualityFieldUpdateOperationsInput | $Enums.VideoQuality | null;
    storageKey?: Prisma.StringFieldUpdateOperationsInput | string;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    sizeBytes?: Prisma.IntFieldUpdateOperationsInput | number;
    durationSeconds?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    processingStatus?: Prisma.EnumAssetProcessingStatusFieldUpdateOperationsInput | $Enums.AssetProcessingStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LessonAssetListRelationFilter = {
    every?: Prisma.LessonAssetWhereInput;
    some?: Prisma.LessonAssetWhereInput;
    none?: Prisma.LessonAssetWhereInput;
};
export type LessonAssetOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type LessonAssetCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    lessonId?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    quality?: Prisma.SortOrder;
    storageKey?: Prisma.SortOrder;
    mimeType?: Prisma.SortOrder;
    sizeBytes?: Prisma.SortOrder;
    durationSeconds?: Prisma.SortOrder;
    processingStatus?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type LessonAssetAvgOrderByAggregateInput = {
    sizeBytes?: Prisma.SortOrder;
    durationSeconds?: Prisma.SortOrder;
};
export type LessonAssetMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    lessonId?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    quality?: Prisma.SortOrder;
    storageKey?: Prisma.SortOrder;
    mimeType?: Prisma.SortOrder;
    sizeBytes?: Prisma.SortOrder;
    durationSeconds?: Prisma.SortOrder;
    processingStatus?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type LessonAssetMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    lessonId?: Prisma.SortOrder;
    kind?: Prisma.SortOrder;
    quality?: Prisma.SortOrder;
    storageKey?: Prisma.SortOrder;
    mimeType?: Prisma.SortOrder;
    sizeBytes?: Prisma.SortOrder;
    durationSeconds?: Prisma.SortOrder;
    processingStatus?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type LessonAssetSumOrderByAggregateInput = {
    sizeBytes?: Prisma.SortOrder;
    durationSeconds?: Prisma.SortOrder;
};
export type LessonAssetCreateNestedManyWithoutLessonInput = {
    create?: Prisma.XOR<Prisma.LessonAssetCreateWithoutLessonInput, Prisma.LessonAssetUncheckedCreateWithoutLessonInput> | Prisma.LessonAssetCreateWithoutLessonInput[] | Prisma.LessonAssetUncheckedCreateWithoutLessonInput[];
    connectOrCreate?: Prisma.LessonAssetCreateOrConnectWithoutLessonInput | Prisma.LessonAssetCreateOrConnectWithoutLessonInput[];
    createMany?: Prisma.LessonAssetCreateManyLessonInputEnvelope;
    connect?: Prisma.LessonAssetWhereUniqueInput | Prisma.LessonAssetWhereUniqueInput[];
};
export type LessonAssetUncheckedCreateNestedManyWithoutLessonInput = {
    create?: Prisma.XOR<Prisma.LessonAssetCreateWithoutLessonInput, Prisma.LessonAssetUncheckedCreateWithoutLessonInput> | Prisma.LessonAssetCreateWithoutLessonInput[] | Prisma.LessonAssetUncheckedCreateWithoutLessonInput[];
    connectOrCreate?: Prisma.LessonAssetCreateOrConnectWithoutLessonInput | Prisma.LessonAssetCreateOrConnectWithoutLessonInput[];
    createMany?: Prisma.LessonAssetCreateManyLessonInputEnvelope;
    connect?: Prisma.LessonAssetWhereUniqueInput | Prisma.LessonAssetWhereUniqueInput[];
};
export type LessonAssetUpdateManyWithoutLessonNestedInput = {
    create?: Prisma.XOR<Prisma.LessonAssetCreateWithoutLessonInput, Prisma.LessonAssetUncheckedCreateWithoutLessonInput> | Prisma.LessonAssetCreateWithoutLessonInput[] | Prisma.LessonAssetUncheckedCreateWithoutLessonInput[];
    connectOrCreate?: Prisma.LessonAssetCreateOrConnectWithoutLessonInput | Prisma.LessonAssetCreateOrConnectWithoutLessonInput[];
    upsert?: Prisma.LessonAssetUpsertWithWhereUniqueWithoutLessonInput | Prisma.LessonAssetUpsertWithWhereUniqueWithoutLessonInput[];
    createMany?: Prisma.LessonAssetCreateManyLessonInputEnvelope;
    set?: Prisma.LessonAssetWhereUniqueInput | Prisma.LessonAssetWhereUniqueInput[];
    disconnect?: Prisma.LessonAssetWhereUniqueInput | Prisma.LessonAssetWhereUniqueInput[];
    delete?: Prisma.LessonAssetWhereUniqueInput | Prisma.LessonAssetWhereUniqueInput[];
    connect?: Prisma.LessonAssetWhereUniqueInput | Prisma.LessonAssetWhereUniqueInput[];
    update?: Prisma.LessonAssetUpdateWithWhereUniqueWithoutLessonInput | Prisma.LessonAssetUpdateWithWhereUniqueWithoutLessonInput[];
    updateMany?: Prisma.LessonAssetUpdateManyWithWhereWithoutLessonInput | Prisma.LessonAssetUpdateManyWithWhereWithoutLessonInput[];
    deleteMany?: Prisma.LessonAssetScalarWhereInput | Prisma.LessonAssetScalarWhereInput[];
};
export type LessonAssetUncheckedUpdateManyWithoutLessonNestedInput = {
    create?: Prisma.XOR<Prisma.LessonAssetCreateWithoutLessonInput, Prisma.LessonAssetUncheckedCreateWithoutLessonInput> | Prisma.LessonAssetCreateWithoutLessonInput[] | Prisma.LessonAssetUncheckedCreateWithoutLessonInput[];
    connectOrCreate?: Prisma.LessonAssetCreateOrConnectWithoutLessonInput | Prisma.LessonAssetCreateOrConnectWithoutLessonInput[];
    upsert?: Prisma.LessonAssetUpsertWithWhereUniqueWithoutLessonInput | Prisma.LessonAssetUpsertWithWhereUniqueWithoutLessonInput[];
    createMany?: Prisma.LessonAssetCreateManyLessonInputEnvelope;
    set?: Prisma.LessonAssetWhereUniqueInput | Prisma.LessonAssetWhereUniqueInput[];
    disconnect?: Prisma.LessonAssetWhereUniqueInput | Prisma.LessonAssetWhereUniqueInput[];
    delete?: Prisma.LessonAssetWhereUniqueInput | Prisma.LessonAssetWhereUniqueInput[];
    connect?: Prisma.LessonAssetWhereUniqueInput | Prisma.LessonAssetWhereUniqueInput[];
    update?: Prisma.LessonAssetUpdateWithWhereUniqueWithoutLessonInput | Prisma.LessonAssetUpdateWithWhereUniqueWithoutLessonInput[];
    updateMany?: Prisma.LessonAssetUpdateManyWithWhereWithoutLessonInput | Prisma.LessonAssetUpdateManyWithWhereWithoutLessonInput[];
    deleteMany?: Prisma.LessonAssetScalarWhereInput | Prisma.LessonAssetScalarWhereInput[];
};
export type EnumAssetKindFieldUpdateOperationsInput = {
    set?: $Enums.AssetKind;
};
export type NullableEnumVideoQualityFieldUpdateOperationsInput = {
    set?: $Enums.VideoQuality | null;
};
export type EnumAssetProcessingStatusFieldUpdateOperationsInput = {
    set?: $Enums.AssetProcessingStatus;
};
export type LessonAssetCreateWithoutLessonInput = {
    id?: string;
    kind: $Enums.AssetKind;
    quality?: $Enums.VideoQuality | null;
    storageKey: string;
    mimeType: string;
    sizeBytes: number;
    durationSeconds?: number | null;
    processingStatus?: $Enums.AssetProcessingStatus;
    createdAt?: Date | string;
};
export type LessonAssetUncheckedCreateWithoutLessonInput = {
    id?: string;
    kind: $Enums.AssetKind;
    quality?: $Enums.VideoQuality | null;
    storageKey: string;
    mimeType: string;
    sizeBytes: number;
    durationSeconds?: number | null;
    processingStatus?: $Enums.AssetProcessingStatus;
    createdAt?: Date | string;
};
export type LessonAssetCreateOrConnectWithoutLessonInput = {
    where: Prisma.LessonAssetWhereUniqueInput;
    create: Prisma.XOR<Prisma.LessonAssetCreateWithoutLessonInput, Prisma.LessonAssetUncheckedCreateWithoutLessonInput>;
};
export type LessonAssetCreateManyLessonInputEnvelope = {
    data: Prisma.LessonAssetCreateManyLessonInput | Prisma.LessonAssetCreateManyLessonInput[];
    skipDuplicates?: boolean;
};
export type LessonAssetUpsertWithWhereUniqueWithoutLessonInput = {
    where: Prisma.LessonAssetWhereUniqueInput;
    update: Prisma.XOR<Prisma.LessonAssetUpdateWithoutLessonInput, Prisma.LessonAssetUncheckedUpdateWithoutLessonInput>;
    create: Prisma.XOR<Prisma.LessonAssetCreateWithoutLessonInput, Prisma.LessonAssetUncheckedCreateWithoutLessonInput>;
};
export type LessonAssetUpdateWithWhereUniqueWithoutLessonInput = {
    where: Prisma.LessonAssetWhereUniqueInput;
    data: Prisma.XOR<Prisma.LessonAssetUpdateWithoutLessonInput, Prisma.LessonAssetUncheckedUpdateWithoutLessonInput>;
};
export type LessonAssetUpdateManyWithWhereWithoutLessonInput = {
    where: Prisma.LessonAssetScalarWhereInput;
    data: Prisma.XOR<Prisma.LessonAssetUpdateManyMutationInput, Prisma.LessonAssetUncheckedUpdateManyWithoutLessonInput>;
};
export type LessonAssetScalarWhereInput = {
    AND?: Prisma.LessonAssetScalarWhereInput | Prisma.LessonAssetScalarWhereInput[];
    OR?: Prisma.LessonAssetScalarWhereInput[];
    NOT?: Prisma.LessonAssetScalarWhereInput | Prisma.LessonAssetScalarWhereInput[];
    id?: Prisma.UuidFilter<"LessonAsset"> | string;
    lessonId?: Prisma.UuidFilter<"LessonAsset"> | string;
    kind?: Prisma.EnumAssetKindFilter<"LessonAsset"> | $Enums.AssetKind;
    quality?: Prisma.EnumVideoQualityNullableFilter<"LessonAsset"> | $Enums.VideoQuality | null;
    storageKey?: Prisma.StringFilter<"LessonAsset"> | string;
    mimeType?: Prisma.StringFilter<"LessonAsset"> | string;
    sizeBytes?: Prisma.IntFilter<"LessonAsset"> | number;
    durationSeconds?: Prisma.IntNullableFilter<"LessonAsset"> | number | null;
    processingStatus?: Prisma.EnumAssetProcessingStatusFilter<"LessonAsset"> | $Enums.AssetProcessingStatus;
    createdAt?: Prisma.DateTimeFilter<"LessonAsset"> | Date | string;
};
export type LessonAssetCreateManyLessonInput = {
    id?: string;
    kind: $Enums.AssetKind;
    quality?: $Enums.VideoQuality | null;
    storageKey: string;
    mimeType: string;
    sizeBytes: number;
    durationSeconds?: number | null;
    processingStatus?: $Enums.AssetProcessingStatus;
    createdAt?: Date | string;
};
export type LessonAssetUpdateWithoutLessonInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumAssetKindFieldUpdateOperationsInput | $Enums.AssetKind;
    quality?: Prisma.NullableEnumVideoQualityFieldUpdateOperationsInput | $Enums.VideoQuality | null;
    storageKey?: Prisma.StringFieldUpdateOperationsInput | string;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    sizeBytes?: Prisma.IntFieldUpdateOperationsInput | number;
    durationSeconds?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    processingStatus?: Prisma.EnumAssetProcessingStatusFieldUpdateOperationsInput | $Enums.AssetProcessingStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LessonAssetUncheckedUpdateWithoutLessonInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumAssetKindFieldUpdateOperationsInput | $Enums.AssetKind;
    quality?: Prisma.NullableEnumVideoQualityFieldUpdateOperationsInput | $Enums.VideoQuality | null;
    storageKey?: Prisma.StringFieldUpdateOperationsInput | string;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    sizeBytes?: Prisma.IntFieldUpdateOperationsInput | number;
    durationSeconds?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    processingStatus?: Prisma.EnumAssetProcessingStatusFieldUpdateOperationsInput | $Enums.AssetProcessingStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LessonAssetUncheckedUpdateManyWithoutLessonInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    kind?: Prisma.EnumAssetKindFieldUpdateOperationsInput | $Enums.AssetKind;
    quality?: Prisma.NullableEnumVideoQualityFieldUpdateOperationsInput | $Enums.VideoQuality | null;
    storageKey?: Prisma.StringFieldUpdateOperationsInput | string;
    mimeType?: Prisma.StringFieldUpdateOperationsInput | string;
    sizeBytes?: Prisma.IntFieldUpdateOperationsInput | number;
    durationSeconds?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    processingStatus?: Prisma.EnumAssetProcessingStatusFieldUpdateOperationsInput | $Enums.AssetProcessingStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type LessonAssetSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    lessonId?: boolean;
    kind?: boolean;
    quality?: boolean;
    storageKey?: boolean;
    mimeType?: boolean;
    sizeBytes?: boolean;
    durationSeconds?: boolean;
    processingStatus?: boolean;
    createdAt?: boolean;
    lesson?: boolean | Prisma.LessonDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["lessonAsset"]>;
export type LessonAssetSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    lessonId?: boolean;
    kind?: boolean;
    quality?: boolean;
    storageKey?: boolean;
    mimeType?: boolean;
    sizeBytes?: boolean;
    durationSeconds?: boolean;
    processingStatus?: boolean;
    createdAt?: boolean;
    lesson?: boolean | Prisma.LessonDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["lessonAsset"]>;
export type LessonAssetSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    lessonId?: boolean;
    kind?: boolean;
    quality?: boolean;
    storageKey?: boolean;
    mimeType?: boolean;
    sizeBytes?: boolean;
    durationSeconds?: boolean;
    processingStatus?: boolean;
    createdAt?: boolean;
    lesson?: boolean | Prisma.LessonDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["lessonAsset"]>;
export type LessonAssetSelectScalar = {
    id?: boolean;
    lessonId?: boolean;
    kind?: boolean;
    quality?: boolean;
    storageKey?: boolean;
    mimeType?: boolean;
    sizeBytes?: boolean;
    durationSeconds?: boolean;
    processingStatus?: boolean;
    createdAt?: boolean;
};
export type LessonAssetOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "lessonId" | "kind" | "quality" | "storageKey" | "mimeType" | "sizeBytes" | "durationSeconds" | "processingStatus" | "createdAt", ExtArgs["result"]["lessonAsset"]>;
export type LessonAssetInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lesson?: boolean | Prisma.LessonDefaultArgs<ExtArgs>;
};
export type LessonAssetIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lesson?: boolean | Prisma.LessonDefaultArgs<ExtArgs>;
};
export type LessonAssetIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    lesson?: boolean | Prisma.LessonDefaultArgs<ExtArgs>;
};
export type $LessonAssetPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "LessonAsset";
    objects: {
        lesson: Prisma.$LessonPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        lessonId: string;
        kind: $Enums.AssetKind;
        quality: $Enums.VideoQuality | null;
        storageKey: string;
        mimeType: string;
        sizeBytes: number;
        durationSeconds: number | null;
        processingStatus: $Enums.AssetProcessingStatus;
        createdAt: Date;
    }, ExtArgs["result"]["lessonAsset"]>;
    composites: {};
};
export type LessonAssetGetPayload<S extends boolean | null | undefined | LessonAssetDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$LessonAssetPayload, S>;
export type LessonAssetCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<LessonAssetFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: LessonAssetCountAggregateInputType | true;
};
export interface LessonAssetDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['LessonAsset'];
        meta: {
            name: 'LessonAsset';
        };
    };
    findUnique<T extends LessonAssetFindUniqueArgs>(args: Prisma.SelectSubset<T, LessonAssetFindUniqueArgs<ExtArgs>>): Prisma.Prisma__LessonAssetClient<runtime.Types.Result.GetResult<Prisma.$LessonAssetPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends LessonAssetFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, LessonAssetFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__LessonAssetClient<runtime.Types.Result.GetResult<Prisma.$LessonAssetPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends LessonAssetFindFirstArgs>(args?: Prisma.SelectSubset<T, LessonAssetFindFirstArgs<ExtArgs>>): Prisma.Prisma__LessonAssetClient<runtime.Types.Result.GetResult<Prisma.$LessonAssetPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends LessonAssetFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, LessonAssetFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__LessonAssetClient<runtime.Types.Result.GetResult<Prisma.$LessonAssetPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends LessonAssetFindManyArgs>(args?: Prisma.SelectSubset<T, LessonAssetFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LessonAssetPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends LessonAssetCreateArgs>(args: Prisma.SelectSubset<T, LessonAssetCreateArgs<ExtArgs>>): Prisma.Prisma__LessonAssetClient<runtime.Types.Result.GetResult<Prisma.$LessonAssetPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends LessonAssetCreateManyArgs>(args?: Prisma.SelectSubset<T, LessonAssetCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends LessonAssetCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, LessonAssetCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LessonAssetPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends LessonAssetDeleteArgs>(args: Prisma.SelectSubset<T, LessonAssetDeleteArgs<ExtArgs>>): Prisma.Prisma__LessonAssetClient<runtime.Types.Result.GetResult<Prisma.$LessonAssetPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends LessonAssetUpdateArgs>(args: Prisma.SelectSubset<T, LessonAssetUpdateArgs<ExtArgs>>): Prisma.Prisma__LessonAssetClient<runtime.Types.Result.GetResult<Prisma.$LessonAssetPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends LessonAssetDeleteManyArgs>(args?: Prisma.SelectSubset<T, LessonAssetDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends LessonAssetUpdateManyArgs>(args: Prisma.SelectSubset<T, LessonAssetUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends LessonAssetUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, LessonAssetUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$LessonAssetPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends LessonAssetUpsertArgs>(args: Prisma.SelectSubset<T, LessonAssetUpsertArgs<ExtArgs>>): Prisma.Prisma__LessonAssetClient<runtime.Types.Result.GetResult<Prisma.$LessonAssetPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends LessonAssetCountArgs>(args?: Prisma.Subset<T, LessonAssetCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], LessonAssetCountAggregateOutputType> : number>;
    aggregate<T extends LessonAssetAggregateArgs>(args: Prisma.Subset<T, LessonAssetAggregateArgs>): Prisma.PrismaPromise<GetLessonAssetAggregateType<T>>;
    groupBy<T extends LessonAssetGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: LessonAssetGroupByArgs['orderBy'];
    } : {
        orderBy?: LessonAssetGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, LessonAssetGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLessonAssetGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: LessonAssetFieldRefs;
}
export interface Prisma__LessonAssetClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    lesson<T extends Prisma.LessonDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.LessonDefaultArgs<ExtArgs>>): Prisma.Prisma__LessonClient<runtime.Types.Result.GetResult<Prisma.$LessonPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface LessonAssetFieldRefs {
    readonly id: Prisma.FieldRef<"LessonAsset", 'String'>;
    readonly lessonId: Prisma.FieldRef<"LessonAsset", 'String'>;
    readonly kind: Prisma.FieldRef<"LessonAsset", 'AssetKind'>;
    readonly quality: Prisma.FieldRef<"LessonAsset", 'VideoQuality'>;
    readonly storageKey: Prisma.FieldRef<"LessonAsset", 'String'>;
    readonly mimeType: Prisma.FieldRef<"LessonAsset", 'String'>;
    readonly sizeBytes: Prisma.FieldRef<"LessonAsset", 'Int'>;
    readonly durationSeconds: Prisma.FieldRef<"LessonAsset", 'Int'>;
    readonly processingStatus: Prisma.FieldRef<"LessonAsset", 'AssetProcessingStatus'>;
    readonly createdAt: Prisma.FieldRef<"LessonAsset", 'DateTime'>;
}
export type LessonAssetFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonAssetSelect<ExtArgs> | null;
    omit?: Prisma.LessonAssetOmit<ExtArgs> | null;
    include?: Prisma.LessonAssetInclude<ExtArgs> | null;
    where: Prisma.LessonAssetWhereUniqueInput;
};
export type LessonAssetFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonAssetSelect<ExtArgs> | null;
    omit?: Prisma.LessonAssetOmit<ExtArgs> | null;
    include?: Prisma.LessonAssetInclude<ExtArgs> | null;
    where: Prisma.LessonAssetWhereUniqueInput;
};
export type LessonAssetFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonAssetSelect<ExtArgs> | null;
    omit?: Prisma.LessonAssetOmit<ExtArgs> | null;
    include?: Prisma.LessonAssetInclude<ExtArgs> | null;
    where?: Prisma.LessonAssetWhereInput;
    orderBy?: Prisma.LessonAssetOrderByWithRelationInput | Prisma.LessonAssetOrderByWithRelationInput[];
    cursor?: Prisma.LessonAssetWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LessonAssetScalarFieldEnum | Prisma.LessonAssetScalarFieldEnum[];
};
export type LessonAssetFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonAssetSelect<ExtArgs> | null;
    omit?: Prisma.LessonAssetOmit<ExtArgs> | null;
    include?: Prisma.LessonAssetInclude<ExtArgs> | null;
    where?: Prisma.LessonAssetWhereInput;
    orderBy?: Prisma.LessonAssetOrderByWithRelationInput | Prisma.LessonAssetOrderByWithRelationInput[];
    cursor?: Prisma.LessonAssetWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LessonAssetScalarFieldEnum | Prisma.LessonAssetScalarFieldEnum[];
};
export type LessonAssetFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonAssetSelect<ExtArgs> | null;
    omit?: Prisma.LessonAssetOmit<ExtArgs> | null;
    include?: Prisma.LessonAssetInclude<ExtArgs> | null;
    where?: Prisma.LessonAssetWhereInput;
    orderBy?: Prisma.LessonAssetOrderByWithRelationInput | Prisma.LessonAssetOrderByWithRelationInput[];
    cursor?: Prisma.LessonAssetWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.LessonAssetScalarFieldEnum | Prisma.LessonAssetScalarFieldEnum[];
};
export type LessonAssetCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonAssetSelect<ExtArgs> | null;
    omit?: Prisma.LessonAssetOmit<ExtArgs> | null;
    include?: Prisma.LessonAssetInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LessonAssetCreateInput, Prisma.LessonAssetUncheckedCreateInput>;
};
export type LessonAssetCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.LessonAssetCreateManyInput | Prisma.LessonAssetCreateManyInput[];
    skipDuplicates?: boolean;
};
export type LessonAssetCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonAssetSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.LessonAssetOmit<ExtArgs> | null;
    data: Prisma.LessonAssetCreateManyInput | Prisma.LessonAssetCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.LessonAssetIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type LessonAssetUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonAssetSelect<ExtArgs> | null;
    omit?: Prisma.LessonAssetOmit<ExtArgs> | null;
    include?: Prisma.LessonAssetInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LessonAssetUpdateInput, Prisma.LessonAssetUncheckedUpdateInput>;
    where: Prisma.LessonAssetWhereUniqueInput;
};
export type LessonAssetUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.LessonAssetUpdateManyMutationInput, Prisma.LessonAssetUncheckedUpdateManyInput>;
    where?: Prisma.LessonAssetWhereInput;
    limit?: number;
};
export type LessonAssetUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonAssetSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.LessonAssetOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.LessonAssetUpdateManyMutationInput, Prisma.LessonAssetUncheckedUpdateManyInput>;
    where?: Prisma.LessonAssetWhereInput;
    limit?: number;
    include?: Prisma.LessonAssetIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type LessonAssetUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonAssetSelect<ExtArgs> | null;
    omit?: Prisma.LessonAssetOmit<ExtArgs> | null;
    include?: Prisma.LessonAssetInclude<ExtArgs> | null;
    where: Prisma.LessonAssetWhereUniqueInput;
    create: Prisma.XOR<Prisma.LessonAssetCreateInput, Prisma.LessonAssetUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.LessonAssetUpdateInput, Prisma.LessonAssetUncheckedUpdateInput>;
};
export type LessonAssetDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonAssetSelect<ExtArgs> | null;
    omit?: Prisma.LessonAssetOmit<ExtArgs> | null;
    include?: Prisma.LessonAssetInclude<ExtArgs> | null;
    where: Prisma.LessonAssetWhereUniqueInput;
};
export type LessonAssetDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.LessonAssetWhereInput;
    limit?: number;
};
export type LessonAssetDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.LessonAssetSelect<ExtArgs> | null;
    omit?: Prisma.LessonAssetOmit<ExtArgs> | null;
    include?: Prisma.LessonAssetInclude<ExtArgs> | null;
};
