"""Simple quicksort example with a tiny self-test."""


def quicksort(values):
    if len(values) <= 1:
        return values[:]

    pivot = values[len(values) // 2]
    smaller = [value for value in values if value < pivot]
    equal = [value for value in values if value == pivot]
    larger = [value for value in values if value > pivot]
    return quicksort(smaller) + equal + quicksort(larger)


def _self_test():
    sample = [7, 3, 9, 1, 3, 5, 8, 2]
    expected = sorted(sample)
    actual = quicksort(sample)
    assert actual == expected, f"expected {expected}, got {actual}"
    print("quicksort self-test passed")


if __name__ == "__main__":
    _self_test()
