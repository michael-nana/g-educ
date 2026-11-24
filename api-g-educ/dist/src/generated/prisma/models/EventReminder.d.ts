import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type EventReminderModel = runtime.Types.Result.DefaultSelection<Prisma.$EventReminderPayload>;
export type AggregateEventReminder = {
    _count: EventReminderCountAggregateOutputType | null;
    _avg: EventReminderAvgAggregateOutputType | null;
    _sum: EventReminderSumAggregateOutputType | null;
    _min: EventReminderMinAggregateOutputType | null;
    _max: EventReminderMaxAggregateOutputType | null;
};
export type EventReminderAvgAggregateOutputType = {
    attempts: number | null;
};
export type EventReminderSumAggregateOutputType = {
    attempts: number | null;
};
export type EventReminderMinAggregateOutputType = {
    id: string | null;
    eventId: string | null;
    remindAt: Date | null;
    status: $Enums.ReminderStatus | null;
    attempts: number | null;
    sentAt: Date | null;
    createdAt: Date | null;
};
export type EventReminderMaxAggregateOutputType = {
    id: string | null;
    eventId: string | null;
    remindAt: Date | null;
    status: $Enums.ReminderStatus | null;
    attempts: number | null;
    sentAt: Date | null;
    createdAt: Date | null;
};
export type EventReminderCountAggregateOutputType = {
    id: number;
    eventId: number;
    remindAt: number;
    status: number;
    attempts: number;
    sentAt: number;
    createdAt: number;
    _all: number;
};
export type EventReminderAvgAggregateInputType = {
    attempts?: true;
};
export type EventReminderSumAggregateInputType = {
    attempts?: true;
};
export type EventReminderMinAggregateInputType = {
    id?: true;
    eventId?: true;
    remindAt?: true;
    status?: true;
    attempts?: true;
    sentAt?: true;
    createdAt?: true;
};
export type EventReminderMaxAggregateInputType = {
    id?: true;
    eventId?: true;
    remindAt?: true;
    status?: true;
    attempts?: true;
    sentAt?: true;
    createdAt?: true;
};
export type EventReminderCountAggregateInputType = {
    id?: true;
    eventId?: true;
    remindAt?: true;
    status?: true;
    attempts?: true;
    sentAt?: true;
    createdAt?: true;
    _all?: true;
};
export type EventReminderAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EventReminderWhereInput;
    orderBy?: Prisma.EventReminderOrderByWithRelationInput | Prisma.EventReminderOrderByWithRelationInput[];
    cursor?: Prisma.EventReminderWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | EventReminderCountAggregateInputType;
    _avg?: EventReminderAvgAggregateInputType;
    _sum?: EventReminderSumAggregateInputType;
    _min?: EventReminderMinAggregateInputType;
    _max?: EventReminderMaxAggregateInputType;
};
export type GetEventReminderAggregateType<T extends EventReminderAggregateArgs> = {
    [P in keyof T & keyof AggregateEventReminder]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateEventReminder[P]> : Prisma.GetScalarType<T[P], AggregateEventReminder[P]>;
};
export type EventReminderGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EventReminderWhereInput;
    orderBy?: Prisma.EventReminderOrderByWithAggregationInput | Prisma.EventReminderOrderByWithAggregationInput[];
    by: Prisma.EventReminderScalarFieldEnum[] | Prisma.EventReminderScalarFieldEnum;
    having?: Prisma.EventReminderScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: EventReminderCountAggregateInputType | true;
    _avg?: EventReminderAvgAggregateInputType;
    _sum?: EventReminderSumAggregateInputType;
    _min?: EventReminderMinAggregateInputType;
    _max?: EventReminderMaxAggregateInputType;
};
export type EventReminderGroupByOutputType = {
    id: string;
    eventId: string;
    remindAt: Date;
    status: $Enums.ReminderStatus;
    attempts: number;
    sentAt: Date | null;
    createdAt: Date;
    _count: EventReminderCountAggregateOutputType | null;
    _avg: EventReminderAvgAggregateOutputType | null;
    _sum: EventReminderSumAggregateOutputType | null;
    _min: EventReminderMinAggregateOutputType | null;
    _max: EventReminderMaxAggregateOutputType | null;
};
export type GetEventReminderGroupByPayload<T extends EventReminderGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<EventReminderGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof EventReminderGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], EventReminderGroupByOutputType[P]> : Prisma.GetScalarType<T[P], EventReminderGroupByOutputType[P]>;
}>>;
export type EventReminderWhereInput = {
    AND?: Prisma.EventReminderWhereInput | Prisma.EventReminderWhereInput[];
    OR?: Prisma.EventReminderWhereInput[];
    NOT?: Prisma.EventReminderWhereInput | Prisma.EventReminderWhereInput[];
    id?: Prisma.UuidFilter<"EventReminder"> | string;
    eventId?: Prisma.UuidFilter<"EventReminder"> | string;
    remindAt?: Prisma.DateTimeFilter<"EventReminder"> | Date | string;
    status?: Prisma.EnumReminderStatusFilter<"EventReminder"> | $Enums.ReminderStatus;
    attempts?: Prisma.IntFilter<"EventReminder"> | number;
    sentAt?: Prisma.DateTimeNullableFilter<"EventReminder"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"EventReminder"> | Date | string;
    event?: Prisma.XOR<Prisma.EventScalarRelationFilter, Prisma.EventWhereInput>;
};
export type EventReminderOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    eventId?: Prisma.SortOrder;
    remindAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    sentAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    event?: Prisma.EventOrderByWithRelationInput;
};
export type EventReminderWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.EventReminderWhereInput | Prisma.EventReminderWhereInput[];
    OR?: Prisma.EventReminderWhereInput[];
    NOT?: Prisma.EventReminderWhereInput | Prisma.EventReminderWhereInput[];
    eventId?: Prisma.UuidFilter<"EventReminder"> | string;
    remindAt?: Prisma.DateTimeFilter<"EventReminder"> | Date | string;
    status?: Prisma.EnumReminderStatusFilter<"EventReminder"> | $Enums.ReminderStatus;
    attempts?: Prisma.IntFilter<"EventReminder"> | number;
    sentAt?: Prisma.DateTimeNullableFilter<"EventReminder"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"EventReminder"> | Date | string;
    event?: Prisma.XOR<Prisma.EventScalarRelationFilter, Prisma.EventWhereInput>;
}, "id">;
export type EventReminderOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    eventId?: Prisma.SortOrder;
    remindAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    sentAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.EventReminderCountOrderByAggregateInput;
    _avg?: Prisma.EventReminderAvgOrderByAggregateInput;
    _max?: Prisma.EventReminderMaxOrderByAggregateInput;
    _min?: Prisma.EventReminderMinOrderByAggregateInput;
    _sum?: Prisma.EventReminderSumOrderByAggregateInput;
};
export type EventReminderScalarWhereWithAggregatesInput = {
    AND?: Prisma.EventReminderScalarWhereWithAggregatesInput | Prisma.EventReminderScalarWhereWithAggregatesInput[];
    OR?: Prisma.EventReminderScalarWhereWithAggregatesInput[];
    NOT?: Prisma.EventReminderScalarWhereWithAggregatesInput | Prisma.EventReminderScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"EventReminder"> | string;
    eventId?: Prisma.UuidWithAggregatesFilter<"EventReminder"> | string;
    remindAt?: Prisma.DateTimeWithAggregatesFilter<"EventReminder"> | Date | string;
    status?: Prisma.EnumReminderStatusWithAggregatesFilter<"EventReminder"> | $Enums.ReminderStatus;
    attempts?: Prisma.IntWithAggregatesFilter<"EventReminder"> | number;
    sentAt?: Prisma.DateTimeNullableWithAggregatesFilter<"EventReminder"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"EventReminder"> | Date | string;
};
export type EventReminderCreateInput = {
    id?: string;
    remindAt: Date | string;
    status?: $Enums.ReminderStatus;
    attempts?: number;
    sentAt?: Date | string | null;
    createdAt?: Date | string;
    event: Prisma.EventCreateNestedOneWithoutRemindersInput;
};
export type EventReminderUncheckedCreateInput = {
    id?: string;
    eventId: string;
    remindAt: Date | string;
    status?: $Enums.ReminderStatus;
    attempts?: number;
    sentAt?: Date | string | null;
    createdAt?: Date | string;
};
export type EventReminderUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    remindAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumReminderStatusFieldUpdateOperationsInput | $Enums.ReminderStatus;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    event?: Prisma.EventUpdateOneRequiredWithoutRemindersNestedInput;
};
export type EventReminderUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    eventId?: Prisma.StringFieldUpdateOperationsInput | string;
    remindAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumReminderStatusFieldUpdateOperationsInput | $Enums.ReminderStatus;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EventReminderCreateManyInput = {
    id?: string;
    eventId: string;
    remindAt: Date | string;
    status?: $Enums.ReminderStatus;
    attempts?: number;
    sentAt?: Date | string | null;
    createdAt?: Date | string;
};
export type EventReminderUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    remindAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumReminderStatusFieldUpdateOperationsInput | $Enums.ReminderStatus;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EventReminderUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    eventId?: Prisma.StringFieldUpdateOperationsInput | string;
    remindAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumReminderStatusFieldUpdateOperationsInput | $Enums.ReminderStatus;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EventReminderListRelationFilter = {
    every?: Prisma.EventReminderWhereInput;
    some?: Prisma.EventReminderWhereInput;
    none?: Prisma.EventReminderWhereInput;
};
export type EventReminderOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type EventReminderCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    eventId?: Prisma.SortOrder;
    remindAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    sentAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type EventReminderAvgOrderByAggregateInput = {
    attempts?: Prisma.SortOrder;
};
export type EventReminderMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    eventId?: Prisma.SortOrder;
    remindAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    sentAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type EventReminderMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    eventId?: Prisma.SortOrder;
    remindAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    attempts?: Prisma.SortOrder;
    sentAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type EventReminderSumOrderByAggregateInput = {
    attempts?: Prisma.SortOrder;
};
export type EventReminderCreateNestedManyWithoutEventInput = {
    create?: Prisma.XOR<Prisma.EventReminderCreateWithoutEventInput, Prisma.EventReminderUncheckedCreateWithoutEventInput> | Prisma.EventReminderCreateWithoutEventInput[] | Prisma.EventReminderUncheckedCreateWithoutEventInput[];
    connectOrCreate?: Prisma.EventReminderCreateOrConnectWithoutEventInput | Prisma.EventReminderCreateOrConnectWithoutEventInput[];
    createMany?: Prisma.EventReminderCreateManyEventInputEnvelope;
    connect?: Prisma.EventReminderWhereUniqueInput | Prisma.EventReminderWhereUniqueInput[];
};
export type EventReminderUncheckedCreateNestedManyWithoutEventInput = {
    create?: Prisma.XOR<Prisma.EventReminderCreateWithoutEventInput, Prisma.EventReminderUncheckedCreateWithoutEventInput> | Prisma.EventReminderCreateWithoutEventInput[] | Prisma.EventReminderUncheckedCreateWithoutEventInput[];
    connectOrCreate?: Prisma.EventReminderCreateOrConnectWithoutEventInput | Prisma.EventReminderCreateOrConnectWithoutEventInput[];
    createMany?: Prisma.EventReminderCreateManyEventInputEnvelope;
    connect?: Prisma.EventReminderWhereUniqueInput | Prisma.EventReminderWhereUniqueInput[];
};
export type EventReminderUpdateManyWithoutEventNestedInput = {
    create?: Prisma.XOR<Prisma.EventReminderCreateWithoutEventInput, Prisma.EventReminderUncheckedCreateWithoutEventInput> | Prisma.EventReminderCreateWithoutEventInput[] | Prisma.EventReminderUncheckedCreateWithoutEventInput[];
    connectOrCreate?: Prisma.EventReminderCreateOrConnectWithoutEventInput | Prisma.EventReminderCreateOrConnectWithoutEventInput[];
    upsert?: Prisma.EventReminderUpsertWithWhereUniqueWithoutEventInput | Prisma.EventReminderUpsertWithWhereUniqueWithoutEventInput[];
    createMany?: Prisma.EventReminderCreateManyEventInputEnvelope;
    set?: Prisma.EventReminderWhereUniqueInput | Prisma.EventReminderWhereUniqueInput[];
    disconnect?: Prisma.EventReminderWhereUniqueInput | Prisma.EventReminderWhereUniqueInput[];
    delete?: Prisma.EventReminderWhereUniqueInput | Prisma.EventReminderWhereUniqueInput[];
    connect?: Prisma.EventReminderWhereUniqueInput | Prisma.EventReminderWhereUniqueInput[];
    update?: Prisma.EventReminderUpdateWithWhereUniqueWithoutEventInput | Prisma.EventReminderUpdateWithWhereUniqueWithoutEventInput[];
    updateMany?: Prisma.EventReminderUpdateManyWithWhereWithoutEventInput | Prisma.EventReminderUpdateManyWithWhereWithoutEventInput[];
    deleteMany?: Prisma.EventReminderScalarWhereInput | Prisma.EventReminderScalarWhereInput[];
};
export type EventReminderUncheckedUpdateManyWithoutEventNestedInput = {
    create?: Prisma.XOR<Prisma.EventReminderCreateWithoutEventInput, Prisma.EventReminderUncheckedCreateWithoutEventInput> | Prisma.EventReminderCreateWithoutEventInput[] | Prisma.EventReminderUncheckedCreateWithoutEventInput[];
    connectOrCreate?: Prisma.EventReminderCreateOrConnectWithoutEventInput | Prisma.EventReminderCreateOrConnectWithoutEventInput[];
    upsert?: Prisma.EventReminderUpsertWithWhereUniqueWithoutEventInput | Prisma.EventReminderUpsertWithWhereUniqueWithoutEventInput[];
    createMany?: Prisma.EventReminderCreateManyEventInputEnvelope;
    set?: Prisma.EventReminderWhereUniqueInput | Prisma.EventReminderWhereUniqueInput[];
    disconnect?: Prisma.EventReminderWhereUniqueInput | Prisma.EventReminderWhereUniqueInput[];
    delete?: Prisma.EventReminderWhereUniqueInput | Prisma.EventReminderWhereUniqueInput[];
    connect?: Prisma.EventReminderWhereUniqueInput | Prisma.EventReminderWhereUniqueInput[];
    update?: Prisma.EventReminderUpdateWithWhereUniqueWithoutEventInput | Prisma.EventReminderUpdateWithWhereUniqueWithoutEventInput[];
    updateMany?: Prisma.EventReminderUpdateManyWithWhereWithoutEventInput | Prisma.EventReminderUpdateManyWithWhereWithoutEventInput[];
    deleteMany?: Prisma.EventReminderScalarWhereInput | Prisma.EventReminderScalarWhereInput[];
};
export type EnumReminderStatusFieldUpdateOperationsInput = {
    set?: $Enums.ReminderStatus;
};
export type EventReminderCreateWithoutEventInput = {
    id?: string;
    remindAt: Date | string;
    status?: $Enums.ReminderStatus;
    attempts?: number;
    sentAt?: Date | string | null;
    createdAt?: Date | string;
};
export type EventReminderUncheckedCreateWithoutEventInput = {
    id?: string;
    remindAt: Date | string;
    status?: $Enums.ReminderStatus;
    attempts?: number;
    sentAt?: Date | string | null;
    createdAt?: Date | string;
};
export type EventReminderCreateOrConnectWithoutEventInput = {
    where: Prisma.EventReminderWhereUniqueInput;
    create: Prisma.XOR<Prisma.EventReminderCreateWithoutEventInput, Prisma.EventReminderUncheckedCreateWithoutEventInput>;
};
export type EventReminderCreateManyEventInputEnvelope = {
    data: Prisma.EventReminderCreateManyEventInput | Prisma.EventReminderCreateManyEventInput[];
    skipDuplicates?: boolean;
};
export type EventReminderUpsertWithWhereUniqueWithoutEventInput = {
    where: Prisma.EventReminderWhereUniqueInput;
    update: Prisma.XOR<Prisma.EventReminderUpdateWithoutEventInput, Prisma.EventReminderUncheckedUpdateWithoutEventInput>;
    create: Prisma.XOR<Prisma.EventReminderCreateWithoutEventInput, Prisma.EventReminderUncheckedCreateWithoutEventInput>;
};
export type EventReminderUpdateWithWhereUniqueWithoutEventInput = {
    where: Prisma.EventReminderWhereUniqueInput;
    data: Prisma.XOR<Prisma.EventReminderUpdateWithoutEventInput, Prisma.EventReminderUncheckedUpdateWithoutEventInput>;
};
export type EventReminderUpdateManyWithWhereWithoutEventInput = {
    where: Prisma.EventReminderScalarWhereInput;
    data: Prisma.XOR<Prisma.EventReminderUpdateManyMutationInput, Prisma.EventReminderUncheckedUpdateManyWithoutEventInput>;
};
export type EventReminderScalarWhereInput = {
    AND?: Prisma.EventReminderScalarWhereInput | Prisma.EventReminderScalarWhereInput[];
    OR?: Prisma.EventReminderScalarWhereInput[];
    NOT?: Prisma.EventReminderScalarWhereInput | Prisma.EventReminderScalarWhereInput[];
    id?: Prisma.UuidFilter<"EventReminder"> | string;
    eventId?: Prisma.UuidFilter<"EventReminder"> | string;
    remindAt?: Prisma.DateTimeFilter<"EventReminder"> | Date | string;
    status?: Prisma.EnumReminderStatusFilter<"EventReminder"> | $Enums.ReminderStatus;
    attempts?: Prisma.IntFilter<"EventReminder"> | number;
    sentAt?: Prisma.DateTimeNullableFilter<"EventReminder"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"EventReminder"> | Date | string;
};
export type EventReminderCreateManyEventInput = {
    id?: string;
    remindAt: Date | string;
    status?: $Enums.ReminderStatus;
    attempts?: number;
    sentAt?: Date | string | null;
    createdAt?: Date | string;
};
export type EventReminderUpdateWithoutEventInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    remindAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumReminderStatusFieldUpdateOperationsInput | $Enums.ReminderStatus;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EventReminderUncheckedUpdateWithoutEventInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    remindAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumReminderStatusFieldUpdateOperationsInput | $Enums.ReminderStatus;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EventReminderUncheckedUpdateManyWithoutEventInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    remindAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.EnumReminderStatusFieldUpdateOperationsInput | $Enums.ReminderStatus;
    attempts?: Prisma.IntFieldUpdateOperationsInput | number;
    sentAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EventReminderSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    eventId?: boolean;
    remindAt?: boolean;
    status?: boolean;
    attempts?: boolean;
    sentAt?: boolean;
    createdAt?: boolean;
    event?: boolean | Prisma.EventDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["eventReminder"]>;
export type EventReminderSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    eventId?: boolean;
    remindAt?: boolean;
    status?: boolean;
    attempts?: boolean;
    sentAt?: boolean;
    createdAt?: boolean;
    event?: boolean | Prisma.EventDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["eventReminder"]>;
export type EventReminderSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    eventId?: boolean;
    remindAt?: boolean;
    status?: boolean;
    attempts?: boolean;
    sentAt?: boolean;
    createdAt?: boolean;
    event?: boolean | Prisma.EventDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["eventReminder"]>;
export type EventReminderSelectScalar = {
    id?: boolean;
    eventId?: boolean;
    remindAt?: boolean;
    status?: boolean;
    attempts?: boolean;
    sentAt?: boolean;
    createdAt?: boolean;
};
export type EventReminderOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "eventId" | "remindAt" | "status" | "attempts" | "sentAt" | "createdAt", ExtArgs["result"]["eventReminder"]>;
export type EventReminderInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    event?: boolean | Prisma.EventDefaultArgs<ExtArgs>;
};
export type EventReminderIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    event?: boolean | Prisma.EventDefaultArgs<ExtArgs>;
};
export type EventReminderIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    event?: boolean | Prisma.EventDefaultArgs<ExtArgs>;
};
export type $EventReminderPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "EventReminder";
    objects: {
        event: Prisma.$EventPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        eventId: string;
        remindAt: Date;
        status: $Enums.ReminderStatus;
        attempts: number;
        sentAt: Date | null;
        createdAt: Date;
    }, ExtArgs["result"]["eventReminder"]>;
    composites: {};
};
export type EventReminderGetPayload<S extends boolean | null | undefined | EventReminderDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$EventReminderPayload, S>;
export type EventReminderCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<EventReminderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: EventReminderCountAggregateInputType | true;
};
export interface EventReminderDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['EventReminder'];
        meta: {
            name: 'EventReminder';
        };
    };
    findUnique<T extends EventReminderFindUniqueArgs>(args: Prisma.SelectSubset<T, EventReminderFindUniqueArgs<ExtArgs>>): Prisma.Prisma__EventReminderClient<runtime.Types.Result.GetResult<Prisma.$EventReminderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends EventReminderFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, EventReminderFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__EventReminderClient<runtime.Types.Result.GetResult<Prisma.$EventReminderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends EventReminderFindFirstArgs>(args?: Prisma.SelectSubset<T, EventReminderFindFirstArgs<ExtArgs>>): Prisma.Prisma__EventReminderClient<runtime.Types.Result.GetResult<Prisma.$EventReminderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends EventReminderFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, EventReminderFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__EventReminderClient<runtime.Types.Result.GetResult<Prisma.$EventReminderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends EventReminderFindManyArgs>(args?: Prisma.SelectSubset<T, EventReminderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EventReminderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends EventReminderCreateArgs>(args: Prisma.SelectSubset<T, EventReminderCreateArgs<ExtArgs>>): Prisma.Prisma__EventReminderClient<runtime.Types.Result.GetResult<Prisma.$EventReminderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends EventReminderCreateManyArgs>(args?: Prisma.SelectSubset<T, EventReminderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends EventReminderCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, EventReminderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EventReminderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends EventReminderDeleteArgs>(args: Prisma.SelectSubset<T, EventReminderDeleteArgs<ExtArgs>>): Prisma.Prisma__EventReminderClient<runtime.Types.Result.GetResult<Prisma.$EventReminderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends EventReminderUpdateArgs>(args: Prisma.SelectSubset<T, EventReminderUpdateArgs<ExtArgs>>): Prisma.Prisma__EventReminderClient<runtime.Types.Result.GetResult<Prisma.$EventReminderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends EventReminderDeleteManyArgs>(args?: Prisma.SelectSubset<T, EventReminderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends EventReminderUpdateManyArgs>(args: Prisma.SelectSubset<T, EventReminderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends EventReminderUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, EventReminderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EventReminderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends EventReminderUpsertArgs>(args: Prisma.SelectSubset<T, EventReminderUpsertArgs<ExtArgs>>): Prisma.Prisma__EventReminderClient<runtime.Types.Result.GetResult<Prisma.$EventReminderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends EventReminderCountArgs>(args?: Prisma.Subset<T, EventReminderCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], EventReminderCountAggregateOutputType> : number>;
    aggregate<T extends EventReminderAggregateArgs>(args: Prisma.Subset<T, EventReminderAggregateArgs>): Prisma.PrismaPromise<GetEventReminderAggregateType<T>>;
    groupBy<T extends EventReminderGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: EventReminderGroupByArgs['orderBy'];
    } : {
        orderBy?: EventReminderGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, EventReminderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventReminderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: EventReminderFieldRefs;
}
export interface Prisma__EventReminderClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    event<T extends Prisma.EventDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.EventDefaultArgs<ExtArgs>>): Prisma.Prisma__EventClient<runtime.Types.Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface EventReminderFieldRefs {
    readonly id: Prisma.FieldRef<"EventReminder", 'String'>;
    readonly eventId: Prisma.FieldRef<"EventReminder", 'String'>;
    readonly remindAt: Prisma.FieldRef<"EventReminder", 'DateTime'>;
    readonly status: Prisma.FieldRef<"EventReminder", 'ReminderStatus'>;
    readonly attempts: Prisma.FieldRef<"EventReminder", 'Int'>;
    readonly sentAt: Prisma.FieldRef<"EventReminder", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"EventReminder", 'DateTime'>;
}
export type EventReminderFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EventReminderSelect<ExtArgs> | null;
    omit?: Prisma.EventReminderOmit<ExtArgs> | null;
    include?: Prisma.EventReminderInclude<ExtArgs> | null;
    where: Prisma.EventReminderWhereUniqueInput;
};
export type EventReminderFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EventReminderSelect<ExtArgs> | null;
    omit?: Prisma.EventReminderOmit<ExtArgs> | null;
    include?: Prisma.EventReminderInclude<ExtArgs> | null;
    where: Prisma.EventReminderWhereUniqueInput;
};
export type EventReminderFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EventReminderSelect<ExtArgs> | null;
    omit?: Prisma.EventReminderOmit<ExtArgs> | null;
    include?: Prisma.EventReminderInclude<ExtArgs> | null;
    where?: Prisma.EventReminderWhereInput;
    orderBy?: Prisma.EventReminderOrderByWithRelationInput | Prisma.EventReminderOrderByWithRelationInput[];
    cursor?: Prisma.EventReminderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EventReminderScalarFieldEnum | Prisma.EventReminderScalarFieldEnum[];
};
export type EventReminderFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EventReminderSelect<ExtArgs> | null;
    omit?: Prisma.EventReminderOmit<ExtArgs> | null;
    include?: Prisma.EventReminderInclude<ExtArgs> | null;
    where?: Prisma.EventReminderWhereInput;
    orderBy?: Prisma.EventReminderOrderByWithRelationInput | Prisma.EventReminderOrderByWithRelationInput[];
    cursor?: Prisma.EventReminderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EventReminderScalarFieldEnum | Prisma.EventReminderScalarFieldEnum[];
};
export type EventReminderFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EventReminderSelect<ExtArgs> | null;
    omit?: Prisma.EventReminderOmit<ExtArgs> | null;
    include?: Prisma.EventReminderInclude<ExtArgs> | null;
    where?: Prisma.EventReminderWhereInput;
    orderBy?: Prisma.EventReminderOrderByWithRelationInput | Prisma.EventReminderOrderByWithRelationInput[];
    cursor?: Prisma.EventReminderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EventReminderScalarFieldEnum | Prisma.EventReminderScalarFieldEnum[];
};
export type EventReminderCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EventReminderSelect<ExtArgs> | null;
    omit?: Prisma.EventReminderOmit<ExtArgs> | null;
    include?: Prisma.EventReminderInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EventReminderCreateInput, Prisma.EventReminderUncheckedCreateInput>;
};
export type EventReminderCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.EventReminderCreateManyInput | Prisma.EventReminderCreateManyInput[];
    skipDuplicates?: boolean;
};
export type EventReminderCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EventReminderSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.EventReminderOmit<ExtArgs> | null;
    data: Prisma.EventReminderCreateManyInput | Prisma.EventReminderCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.EventReminderIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type EventReminderUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EventReminderSelect<ExtArgs> | null;
    omit?: Prisma.EventReminderOmit<ExtArgs> | null;
    include?: Prisma.EventReminderInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EventReminderUpdateInput, Prisma.EventReminderUncheckedUpdateInput>;
    where: Prisma.EventReminderWhereUniqueInput;
};
export type EventReminderUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.EventReminderUpdateManyMutationInput, Prisma.EventReminderUncheckedUpdateManyInput>;
    where?: Prisma.EventReminderWhereInput;
    limit?: number;
};
export type EventReminderUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EventReminderSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.EventReminderOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.EventReminderUpdateManyMutationInput, Prisma.EventReminderUncheckedUpdateManyInput>;
    where?: Prisma.EventReminderWhereInput;
    limit?: number;
    include?: Prisma.EventReminderIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type EventReminderUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EventReminderSelect<ExtArgs> | null;
    omit?: Prisma.EventReminderOmit<ExtArgs> | null;
    include?: Prisma.EventReminderInclude<ExtArgs> | null;
    where: Prisma.EventReminderWhereUniqueInput;
    create: Prisma.XOR<Prisma.EventReminderCreateInput, Prisma.EventReminderUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.EventReminderUpdateInput, Prisma.EventReminderUncheckedUpdateInput>;
};
export type EventReminderDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EventReminderSelect<ExtArgs> | null;
    omit?: Prisma.EventReminderOmit<ExtArgs> | null;
    include?: Prisma.EventReminderInclude<ExtArgs> | null;
    where: Prisma.EventReminderWhereUniqueInput;
};
export type EventReminderDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EventReminderWhereInput;
    limit?: number;
};
export type EventReminderDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.EventReminderSelect<ExtArgs> | null;
    omit?: Prisma.EventReminderOmit<ExtArgs> | null;
    include?: Prisma.EventReminderInclude<ExtArgs> | null;
};
